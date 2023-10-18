FROM node:18.17-slim
RUN apt-get update && apt-get install -y openssl libssl-dev
WORKDIR /opt/taskforce-task
COPY ./dist/apps/task/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/task/assets/prisma/schema.prisma ./schema.prisma
RUN npx prisma@5.1.1
RUN npx prisma generate --schema schema.prisma
RUN cp -R ../../node_modules/.prisma ./node_modules
# && rm -rf ../node_modules
COPY ./dist/apps/task .
CMD ["node", "./main.js"]
