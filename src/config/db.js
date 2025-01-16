// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Cela permet de centraliser la gestion des connexions, de réutiliser le code et de faciliter la maintenance.
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : En créant une fonction dédiée pour fermer les connexions et en s'assurant qu'elle est appelée lors de la fermeture de l'application.
// Importation des modules nécessaires
require('dotenv').config(); // Chargement des variables d'environnement
const { MongoClient } = require('mongodb');
const redis = require('redis');

// Déclaration des variables pour les clients MongoDB et Redis
let mongoClient, redisClient, db;

// Fonction pour connecter à MongoDB
async function connectMongo() {
  const url = process.env.MONGODB_URI; // Utilisation des variables d'environnement
  const dbName = process.env.MONGODB_DB_NAME;
  
  try {
    mongoClient = new MongoClient(url, { useUnifiedTopology: true });
    await mongoClient.connect();
    db = mongoClient.db(dbName);
    console.log("Connecté à MongoDB avec succès !");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB : ", error);
    setTimeout(connectMongo, 5000); // Tentative de reconnexion après 5 secondes
  }
}

// Fonction pour connecter à Redis
async function connectRedis() {
  const client = redis.createClient({ url: process.env.REDIS_URI });

  client.on('connect', () => {
    console.log('Connecté à Redis avec succès !');
  });

  client.on('error', (err) => {
    console.error('Erreur Redis :', err);
    setTimeout(connectRedis, 5000); // Tentative de reconnexion après 5 secondes
  });

  try {
    await client.connect(); // Connexion à Redis
    redisClient = client;
  } catch (err) {
    console.error('Erreur de connexion à Redis :', err);
    setTimeout(connectRedis, 5000); // Tentative de reconnexion en cas d'erreur
  }
}

// Fonction pour fermer les connexions
async function closeConnections() {
  if (mongoClient) {
    await mongoClient.close();
    console.log('Connexion MongoDB fermée');
  }
  
  if (redisClient) {
    redisClient.quit();
    console.log('Connexion Redis fermée');
  }
}

// Export des fonctions et des clients
async function getDb() {
  if (!db) {
    await connectMongo(); // Attendre la connexion à MongoDB avant de retourner db
  }
  return db;
}

async function getRedisClient() {
  if (!redisClient) {
    await connectRedis(); // Attendre la connexion à Redis avant de retourner redisClient
  }
  return redisClient;
}

module.exports = {
  connectMongo,
  connectRedis,
  closeConnections,
  getDb,
  getRedisClient,
};
