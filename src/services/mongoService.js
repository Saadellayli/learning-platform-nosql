// Question: Pourquoi créer des services séparés ?
// Réponse: Créer des services séparés permet de mieux organiser le code, de faciliter la maintenance et les tests, et de réutiliser le code dans différentes parties de l'application.

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
    try {
        return await collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
        console.error('Failed to find document by ID:', error);
    }
}

async function insertOne(collection, document) {
    try {
        const result = await collection.insertOne(document);
        return result.insertedId;
    } catch (error) {
        console.error('Failed to insert document:', error);
    }
}

async function getCourses() {
    try {
        const db = await getDb(); // Assuming getDb is a function that returns the database connection
        const courses = await db.collection('courses').find().toArray();
        return courses;
    } catch (error) {
        console.error('Failed to fetch courses:', error);
        throw error;
    }
}

// Export des services
module.exports = {
    findOneById,
    insertOne,
    getCourses
};