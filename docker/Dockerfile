##ARG FORMKIT_PRO_KEY
#FROM node:17-alpine
##ARG FORMKIT_PRO_KEY
##ENV FORMKIT_PRO_KEY=${FORMKIT_PRO_KEY}
#
#WORKDIR /app
#COPY . .
#
#RUN npm install &&\
#    npm run build
#
#ENV NUXT_HOST=0.0.0.0
#ENV NUXT_PORT=3000
#
#
#
#ENTRYPOINT ["node", ".output/server/index.mjs"]

#ARG FORMKIT_PRO_KEY
FROM node:17-alpine
#ARG FORMKIT_PRO_KEY
#ENV FORMKIT_PRO_KEY=${FORMKIT_PRO_KEY}

# Create and set working directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Environment variables
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Start the app
ENTRYPOINT ["node", ".output/server/index.mjs"]

