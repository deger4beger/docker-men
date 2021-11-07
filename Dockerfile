FROM node:15
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . ./
EXPOSE 3030
CMD ["yarn", "dev"]