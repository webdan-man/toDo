FROM node:lts-alpine
WORKDIR /app
RUN npm install -g json-server
COPY . .
CMD ["json-server", "db.js"]
EXPOSE 3000
