// routes/sensors.js
const express = require('express');
const router = express.Router();
const { publish } = require('../mq');

// POST /sensors/reading
router.post('/reading', async (req, res) => {
  const { greenhouseId, temperature, humidity, ts } = req.body || {};
  const alerts = [];
  if (temperature >= 35) alerts.push({ type: 'TEMP_HIGH', routing: 'alerts.tempHigh' });
  if (humidity    <= 20) alerts.push({ type: 'HUM_LOW',  routing: 'alerts.humLow'  });

  for (const a of alerts) {
    await publish(a.routing, {
      greenhouseId, temperature, humidity, ts: ts || Date.now(), alertType: a.type
    });
  }
  res.json({ ok: true, published: alerts.map(a => a.type) });
});

module.exports = router;
