FROM node:18-alpine
WORKDIR /usr/src/app
COPY api-express/package*.json ./
RUN npm install --production
COPY api-express/. .
EXPOSE 3000
CMD ["npm", "start"]