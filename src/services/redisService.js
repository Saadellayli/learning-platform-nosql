// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Utilisez des TTL (Time To Live) appropriés pour les clés, invalidez les caches obsolètes et utilisez des structures de données adaptées comme les listes, ensembles, et hachages.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utilisez des noms de clés descriptifs et cohérents, évitez les clés trop longues, et utilisez des namespaces pour organiser les clés.

// Fonctions utilitaires pour Redis
const redis = require('redis');
const client = redis.createClient();

async function cacheData(key, data, ttl) {
    try {
        await client.set(key, JSON.stringify(data), 'EX', ttl);
    } catch (error) {
        console.error('Failed to cache data:', error);
    }
}

async function getCachedData(key) {
    try {
        const data = await client.get(key);
        return JSON.parse(data);
    } catch (error) {
        console.error('Failed to get cached data:', error);
    }
}

module.exports = {
    cacheData,
    getCachedData
};