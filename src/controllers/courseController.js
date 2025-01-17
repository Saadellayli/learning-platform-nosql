// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :
const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

// Fonction pour récupérer tous les cours
async function getAllCourses(req, res) {
  try {
    const courses = await mongoService.find('courses', {});
    return res.status(200).json(courses);
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}

// Fonction pour créer un cours
async function createCourse(req, res) {
  try {
    const { title, description, category, teacher, students, resources } = req.body;

    if (!title || !description || !category || !teacher) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const newCourse = {
      title,
      description,
      category,

      teacher: new ObjectId(teacher), // Use 'new' keyword here
      students: students.map(studentId => new ObjectId(studentId)), // Use 'new' keyword here
      resources,
    };

    const result = await mongoService.insertOne('courses', newCourse);
    return res.status(201).json(result);
  } catch (error) {
    console.error('Erreur lors de la création du cours:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}

async function getCourse(req, res) {
  try {
    const { id } = req.params;
    console.log(`Received request to get course with ID: ${id}`);

    if (!ObjectId.isValid(id)) {
      console.error(`Invalid ObjectId: ${id}`);
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Vérifiez si le service Redis est correctement configuré
    if (!redisService || typeof redisService.getData !== 'function') {
      console.error('redisService is not defined or getData method is missing');
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }

    // Récupérer depuis Redis avec un timeout
    const redisTimeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Redis timeout')), 2000));
    const cachedCourse = await Promise.race([redisService.getData(id), redisTimeout]).catch(() => null);
    
    if (cachedCourse) {
      console.log(`Course found in cache for ID: ${id}`);
      return res.status(200).json(cachedCourse);
    }

    // Si non trouvé dans Redis ou en cas de timeout, récupérer depuis MongoDB
    const course = await mongoService.findOneById('courses', id);
    if (!course) {
      console.log(`Course not found in database for ID: ${id}`);
      return res.status(404).json({ message: 'Cours non trouvé' });
    }

    // Mettre en cache dans Redis
    await redisService.cacheData(id, course, 3600); // Cache pour 1 heure
    console.log(`Course found and cached for ID: ${id}`);
    return res.status(200).json(course);
  } catch (error) {
    console.error('Erreur lors de la récupération du cours:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}

// Fonction pour récupérer des statistiques sur les cours
async function getCourseStats(req, res) {
  try {
    const totalCourses = await mongoService.countDocuments('courses');
    return res.status(200).json({ totalCourses });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}

// Export des contrôleurs
module.exports = {
  createCourse,
  getCourse,
  getCourseStats,
  getAllCourses,
};