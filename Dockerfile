FROM node:18-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm update
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]