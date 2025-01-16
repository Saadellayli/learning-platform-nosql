// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Cela permet de mieux organiser le code, de rendre les routes plus faciles à gérer et de faciliter la maintenance.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: En regroupant les routes par fonctionnalité ou par ressource, et en utilisant des conventions de nommage claires.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes pour les cours
router.post('/', courseController.createCourse);
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourse);
router.get('/stats', courseController.getCourseStats);

module.exports = router;