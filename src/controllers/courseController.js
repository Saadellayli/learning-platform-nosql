// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Un contrôleur contient la logique métier pour gérer les requêtes, tandis qu'une route définit les points d'accès de l'API et les associe aux contrôleurs.
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Cela permet de rendre le code plus modulaire, réutilisable et maintenable.

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  try {
    const courseData = req.body;
    const result = await mongoService.createCourse(courseData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
}

async function getCourses(req, res) {
  try {
    const courses = await mongoService.getCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
}

async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    const course = await mongoService.getCourse(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
}

async function getCourseStats(req, res) {
  try {
    const stats = await mongoService.getCourseStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course stats' });
  }
}

// Export des contrôleurs
module.exports = {
  createCourse,
  getCourses,
  getCourse,
  getCourseStats
};