// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Cela permet de centraliser la gestion des connexions, de réutiliser le code et de faciliter la maintenance.
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : En créant une fonction dédiée pour fermer les connexions et en s'assurant qu'elle est appelée lors de la fermeture de l'application.
const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env'); 
let mongoClient, redisClient, db;

// Fonction pour connecter à MongoDB
async function connectMongo() {
  const url = config.MONGO_URI; 
  const dbName = config.DB_NAME; 
  try {
    mongoClient = new MongoClient(url, { useUnifiedTopology: true });
    await mongoClient.connect();
    db = mongoClient.db(dbName);
    console.log("Connecté à MongoDB avec succès !");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB : ", error);
    setTimeout(connectMongo, 5000); // Reconnexion après 5 secondes
  }
}

// Fonction pour connecter à Redis
function connectRedis() {
  const client = redis.createClient({
    url: config.REDIS_URI, 
  });

  client.on('connect', () => {
    console.log('Connecté à Redis avec succès !');
  });

  client.on('error', (err) => {
    console.error('Erreur Redis :', err);
    setTimeout(connectRedis, 5000); // Reconnexion après 5 secondes en cas d'erreur
  });

  redisClient = client;
  client.connect();
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

// Export des fonctions et clients
module.exports = {
  connectMongo,
  connectRedis,
  closeConnections,
  db, // L'objet DB de MongoDB sera accessible dans les autres parties du code
  redisClient, // Le client Redis sera accessible pour des opérations Redis
};
