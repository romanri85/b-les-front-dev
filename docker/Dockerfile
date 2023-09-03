#ARG FORMKIT_PRO_KEY
FROM node:17-alpine
#ARG FORMKIT_PRO_KEY
#ENV FORMKIT_PRO_KEY=${FORMKIT_PRO_KEY}

WORKDIR /app
COPY . .

RUN npm install &&\
    npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000



ENTRYPOINT ["node", ".output/server/index.mjs"]
