# Stage 1: Build
FROM node:23-alpine AS build

WORKDIR /app

# ENV define (IMPORTANT 🔥)
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2
FROM node:23-alpine
WORKDIR /app

RUN npm install -g serve
COPY --from=build /app/dist ./dist

EXPOSE 3014
CMD ["serve", "-s", "dist", "-l", "3014"]