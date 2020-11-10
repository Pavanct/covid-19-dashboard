FROM node:latest as base-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ARG API_KEY
RUN API_KEY=${API_KEY}} \
    npm run build  

FROM nginx:latest as prod_stage
RUN sed -i 's,location / {,location / {try_files $uri $uri/ /index.html?/$request_uri;,g' /etc/nginx/conf.d/default.conf
COPY --from=base-stage /usr/src/app/dist/corona-tracker/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;" ]