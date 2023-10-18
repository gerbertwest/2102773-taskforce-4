FROM node:18.17-alpine
WORKDIR /opt/taskforce-notify
COPY ./dist/apps/notify/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/notify .
CMD ["node", "./main.js"]
