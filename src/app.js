// Question: Comment organiser le point d'entrée de l'application ?
// Réponse: Le point d'entrée de l'application doit initialiser les connexions aux bases de données, configurer les middlewares, monter les routes et démarrer le serveur.
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
// Réponse: Utiliser une fonction asynchrone pour gérer les connexions et démarrer le serveur, et gérer proprement les erreurs et la fermeture de l'application.

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
// const studentRoutes = require('./routes/studentRoutes'); // Uncomment if you have student routes

const app = express();

async function startServer() {
  try {
    // Initialiser les connexions aux bases de données
    await db.connectMongo();
    db.connectRedis();

    // Configurer les middlewares Express
    app.use(express.json());

    // Monter les routes
    app.use('/api/courses', courseRoutes);
    // app.use('/api/students', studentRoutes); // Uncomment if you have student routes

    // Démarrer le serveur
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  await db.closeConnections();
  process.exit(0);
});

startServer();