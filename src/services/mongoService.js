// Question: Pourquoi créer des services séparés ?
// Réponse: 
const { ObjectId } = require('mongodb');
const db = require('../config/db');

async function find(collection, query) {
  try {
    return await db.getDb().collection(collection).find(query).toArray();
  } catch (error) {
    console.error('Erreur lors de la récupération des documents:', error);
    throw error;
  }
}

async function findOneById(collectionName, id) {
  try {
    console.log(`Searching for document in collection ${collectionName} with ID: ${id}`);
    const result = await db.getDb().collection(collectionName).findOne({ _id: new ObjectId(id) });
    if (!result) {
      console.error(`Document with ID ${id} not found in collection ${collectionName}`);
    }
    return result;
  } catch (error) {
    console.error('Erreur lors de la recherche par ID:', error);
    throw error;
  }
}

async function countDocuments(collection) {
  try {
    return await db.getDb().collection(collection).countDocuments();
  } catch (error) {
    console.error('Erreur lors du comptage des documents:', error);
    throw error;
  }
}

async function insertOne(collectionName, document) {
  try {
    const result = await db.getDb().collection(collectionName).insertOne(document);
    return { _id: result.insertedId, ...document };
  } catch (error) {
    console.error('Erreur lors de l\'insertion du document:', error);
    throw error;
  }
}

module.exports = {
  findOneById,
  countDocuments,
  insertOne,
  find,
};