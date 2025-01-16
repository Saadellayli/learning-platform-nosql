// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : Cela permet de s'assurer que toutes les configurations nécessaires sont présentes avant de démarrer l'application, évitant ainsi des erreurs inattendues en cours d'exécution.
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : L'application doit s'arrêter immédiatement et signaler l'erreur, ce qui permet de corriger le problème avant de continuer.

const dotenv = require('dotenv');
dotenv.config(); // Charger les variables d'environnement à partir du fichier .env

// Liste des variables d'environnement requises
const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI',
  'API_KEY',
  'JWT_SECRET'
];

// Validation des variables d'environnement
function validateEnv() {
  const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Les variables d'environnement suivantes sont manquantes : ${missingVars.join(', ')}`
    );
  }
}

// Appeler la validation immédiatement pour détecter les problèmes au démarrage
validateEnv();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET
};
