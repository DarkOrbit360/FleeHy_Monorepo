
FROM node:18-alpine
WORKDIR /app
COPY apps/backend/package*.json ./
RUN npm ci
COPY apps/backend .
RUN npx prisma generate
EXPOSE 4000
CMD ["npm","start"]
