// mq.js
const amqp = require('amqplib');

const RABBIT_URL = process.env.RABBIT_URL || 'amqp://dev:devpass@rabbitmq:5672';
const EXCHANGE   = process.env.RABBIT_EXCHANGE || 'alerts.exchange';
const QUEUE      = process.env.RABBIT_QUEUE || 'alerts.queue';

let channel;

async function connect() {
  if (channel) return channel;
  const conn = await amqp.connect(RABBIT_URL);
  channel = await conn.createChannel();
  await channel.assertExchange(EXCHANGE, 'topic', { durable: true });
  await channel.assertQueue(QUEUE, { durable: true });
  await channel.bindQueue(QUEUE, EXCHANGE, 'alerts.*');
  return channel;
}

async function publish(routingKey, payload) {
  const ch = await connect();
  ch.publish(EXCHANGE, routingKey, Buffer.from(JSON.stringify(payload)), {
    persistent: true, contentType: 'application/json'
  });
}

module.exports = { publish };
