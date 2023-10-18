FROM node:18.17-alpine
WORKDIR /opt/taskforce-users
COPY ./dist/apps/users/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/users .
CMD ["node", "./main.js"]
