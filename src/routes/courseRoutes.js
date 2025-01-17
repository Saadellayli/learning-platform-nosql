// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : 
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: 

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes pour les cours
router.post('/', courseController.createCourse); // Créer un cours
router.get('/', courseController.getAllCourses); // Récupérer tous les cours
router.get('/stats', courseController.getCourseStats); // Récupérer des statistiques sur les cours
router.get('/:id', courseController.getCourse); // Récupérer un cours par ID

module.exports = router;