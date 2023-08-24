FROM node:17-alpine

WORKDIR /app
COPY . .

RUN npm install &&\
    npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000



ENTRYPOINT ["node", ".output/server/index.mjs"]
