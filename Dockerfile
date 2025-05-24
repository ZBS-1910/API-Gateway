FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=3000

CMD ["npm", "run", "dev"]


#docker build -t api-gateway .

# docker run -it --init --name api_gateway -p 3001:3001 -v "${PWD}:/developer/nodejs/api-gateway" -v api-gateway-node-modules:/developer/nodejs/api-gateway/node_modules api-gateway:latest
