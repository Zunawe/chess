FROM node:16

WORKDIR /opt/app
COPY . .
RUN npm i

ENV NODE_ENV=production
ENV PORT=8000

RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]
