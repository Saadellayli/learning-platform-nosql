// Question: Pourquoi créer des services séparés ?
// Réponse: Créer des services séparés permet de mieux organiser le code, de faciliter la maintenance et les tests, et de réutiliser le code dans différentes parties de l'application.

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
    return await collection.findOne({ _id: new ObjectId(id) });
}

async function insertOne(collection, document) {
    const result = await collection.insertOne(document);
    return result.insertedId;
}

// Export des services
module.exports = {
    findOneById,
    insertOne
};