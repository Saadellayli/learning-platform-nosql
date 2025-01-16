// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Utilisez des TTL (Time To Live) appropriés pour les clés, invalidez les caches obsolètes et utilisez des structures de données adaptées comme les listes, ensembles, et hachages.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utilisez des noms de clés descriptifs et cohérents, évitez les clés trop longues, et utilisez des namespaces pour organiser les clés.

// Fonctions utilitaires pour Redis
const redis = require('redis');
const client = redis.createClient();

async function cacheData(key, data, ttl) {
    await client.set(key, JSON.stringify(data), 'EX', ttl);
}

async function getCachedData(key) {
    const data = await client.get(key);
    return JSON.parse(data);
}

module.exports = {
    cacheData,
    getCachedData
};