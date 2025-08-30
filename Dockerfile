# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copia apenas os manifests para aproveitar cache
COPY package.json package-lock.json* ./

# Usa lock se existir; instala só deps de produção; ignora conflitos de peer de deps de dev
RUN sh -c 'if [ -f package-lock.json ]; then npm ci --omit=dev --legacy-peer-deps; else npm install --omit=dev --legacy-peer-deps; fi'

# Copia o código-fonte
COPY src ./src

EXPOSE 3000
CMD ["npm","start"]