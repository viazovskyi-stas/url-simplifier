FROM node:20-alpine

WORKDIR /usr/src/app
COPY package*.json ./
ENV MONGO_URL "mongodb://mongo:27017"
RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "run", "dev"]