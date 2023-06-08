FROM node:20-alpine
WORKDIR /app
COPY mobtimer-frontend/package.json ./
COPY mobtimer-frontend/yarn.lock ./
COPY ./ ./
RUN yarn
CMD ["./scripts/api-setup.sh2.sh"]
