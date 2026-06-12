# =============================================================================
# Dockerfile.TODO — Plantilla con errores intencionales para la práctica
# =============================================================================
# INSTRUCCIONES:
# 1. Copia este archivo como "Dockerfile" en la raíz del proyecto (sin .TODO)
# 2. Revisa y corrige cada bloque marcado con TODO
# 3. Verifica el build: docker build -t practica-backend .
# 4. Prueba local: docker run --env-file .env -p 3000:3000 practica-backend
# =============================================================================

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 8080
CMD ["node", "dist/main"]