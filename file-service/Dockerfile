#-------------------------------------------------------------------------------
FROM node:20 AS core

WORKDIR /app

# Configurações do ambiente
ENV NODE_ENV=production
ENV PATH=/app/node_modules/.bin:$PATH
ENV PUPPETEEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome

# Instalação do Google Chrome
RUN apt-get update && \
	apt-get install -y \
	wget gnupg libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++ --no-install-recommends && \
	wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
	sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' && \
	apt-get update && apt-get install -y google-chrome-stable --no-install-recommends && \
	rm -rf /var/lib/apt/lists/*
                
#-------------------------------------------------------------------------------
FROM core AS build
# Instalação das dependências para build
COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

#-------------------------------------------------------------------------------
FROM core AS launch

# Cópia do código-fonte
COPY --from=build --chown=node:node /app ./

# Inicialização do serviço
CMD ["yarn", "start"]

EXPOSE 3000