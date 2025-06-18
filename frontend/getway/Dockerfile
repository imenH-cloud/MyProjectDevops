FROM node:20

# Dossier de travail
WORKDIR /app

# Copie du package.json et package-lock.json
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste du code source
COPY . .

# Expose le port Angular
EXPOSE 4200

# Démarrage du serveur Angular
CMD ["npm", "run", "start"]

