# Build
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
ARG VITE_API_URL=https://admin-api-production-4a7f.up.railway.app
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Serve — nginx must listen on Railway $PORT (not hardcoded 80)
FROM nginx:alpine
ENV PORT=8080
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
