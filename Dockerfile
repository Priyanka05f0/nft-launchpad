# ------------------------
# Hardhat (Node 18)
# ------------------------
FROM node:18-alpine AS contracts
WORKDIR /app/contracts

COPY contracts/package*.json ./
RUN npm install
COPY contracts .

CMD ["npx", "hardhat", "node"]

# ------------------------
# Frontend (Node 20)
# ------------------------
FROM node:20-alpine AS frontend
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install
COPY frontend .

CMD ["npm", "run", "dev"]
