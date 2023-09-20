# syntax=docker/dockerfile:1

FROM node
ENV NODE_ENV=local


WORKDIR /app

COPY . .


RUN npm run build
RUN npm install


CMD ["npm", "start"]