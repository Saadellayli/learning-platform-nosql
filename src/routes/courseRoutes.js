// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Cela permet de mieux organiser le code, de rendre les routes plus faciles à gérer et de faciliter la maintenance.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: En regroupant les routes par fonctionnalité ou par ressource, et en utilisant des conventions de nommage claires.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const enrollmentController = require('../controllers/enrollmentController'); 
const quizController = require('../controllers/quizController'); // Corrected path
const categoryController = require('../controllers/categoryController');
const reviewController = require('../controllers/reviewController');

// Routes pour les cours
router.post('/', courseController.createCourse);
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourse);
router.get('/stats', courseController.getCourseStats);

// Routes pour les inscriptions
 router.post('/:courseId/enroll', enrollmentController.enrollUser); 
 router.get('/:courseId/enrollments', enrollmentController.getEnrollments); 

// Routes pour les quiz
router.post('/:courseId/modules/:moduleId/quizzes', quizController.createQuiz);
router.get('/:courseId/modules/:moduleId/quizzes', quizController.getQuizzes);

// Routes pour les catégories
router.post('/categories', categoryController.createCategory);
router.get('/categories', categoryController.getCategories);

// Routes pour les avis
router.post('/:courseId/reviews', reviewController.createReview);
router.get('/:courseId/reviews', reviewController.getReviews);

module.exports = router;