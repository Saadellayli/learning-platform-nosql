// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :
const redis = require('redis');

// Création d'un client Redis
const client = redis.createClient();

// Gestion des événements du client Redis
client.on('error', (err) => {
  console.error('Erreur Redis:', err);
});

client.on('connect', () => {
  console.log('Connexion réussie à Redis');
});

client.on('end', () => {
  console.log('Redis client disconnected');
});

/**
 * Récupère une donnée depuis Redis
 * @param {string} key - La clé de la donnée à récupérer
 * @returns {Promise<any>} - La donnée (ou null si non trouvée)
 */
async function getData(key) {
  if (!client.isOpen) {
    console.error('Redis client is not connected, attempting to reconnect...');
    await client.connect();
  }
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Redis timeout')), 2000);
    client.get(key, (err, data) => {
      clearTimeout(timeout);
      if (err) {
        console.error(`Erreur lors de la récupération de la clé ${key} depuis Redis:`, err);
        return reject(err);
      }
      resolve(data ? JSON.parse(data) : null);
    });
  });
}

/**
 * Met en cache une donnée dans Redis
 * @param {string} key - La clé de la donnée
 * @param {any} value - La valeur à stocker
 * @param {number} ttl - Durée de vie en secondes
 */
async function cacheData(key, value, ttl) {
  if (!client.isOpen) {
    console.error('Redis client is not connected, attempting to reconnect...');
    await client.connect();
  }
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Redis timeout')), 2000);
    client.set(key, JSON.stringify(value), 'EX', ttl, (err) => {
      clearTimeout(timeout);
      if (err) {
        console.error(`Erreur lors de la mise en cache de la clé ${key} dans Redis:`, err);
        return reject(err);
      }
      console.log(`Donnée mise en cache dans Redis pour la clé ${key}, durée: ${ttl}s`);
      resolve();
    });
  });
}

/**
 * Supprime une donnée du cache Redis
 * @param {string} key - La clé à supprimer
 * @returns {Promise<void>}
 */
async function deleteData(key) {
  if (!client.isOpen) {
    console.error('Redis client is not connected, attempting to reconnect...');
    await client.connect();
  }
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Redis timeout')), 2000);
    client.del(key, (err) => {
      clearTimeout(timeout);
      if (err) {
        console.error(`Erreur lors de la suppression de la clé ${key} dans Redis:`, err);
        return reject(err);
      }
      console.log(`Donnée supprimée de Redis pour la clé ${key}`);
      resolve();
    });
  });
}

// Exportation des fonctions
module.exports = {
  getData,
  cacheData,
  deleteData,
};