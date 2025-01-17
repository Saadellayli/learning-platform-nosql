// Question: Comment organiser le point d'entrée de l'application ?
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

const express = require('express');
const config = require('./config/env'); // Fichier de configuration des variables d'environnement
const db = require('./config/db'); // Fichier pour la gestion de la connexion à la base de données

const courseRoutes = require('./routes/courseRoutes'); // Routes des cours

// Créer une instance d'Express
const app = express();

// Fonction pour démarrer le serveur
async function startServer() {
  try {
    // Initialiser les connexions aux bases de données (MongoDB, Redis, etc.)
    await db.initializeConnections();
    console.log('Database connections initialized');

    // Configurer les middlewares Express (par exemple, JSON parsing)
    app.use(express.json());

    // Monter les routes de l'API
    app.use('/api/courses', courseRoutes);
    // Ajouter d'autres routes ici (comme studentRoutes si nécessaire)

    // Démarrer le serveur sur le port défini dans la configuration
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); // En cas d'erreur, on arrête le serveur
  }
}

// Gestion propre de l'arrêt (ex. lors de l'envoi du signal SIGTERM)
process.on('SIGTERM', async () => {
  try {
    // Implémenter la fermeture propre des connexions à MongoDB, Redis, etc.
    await db.closeConnections();
    console.log('Database connections closed');

    // Arrêter proprement le serveur
    process.exit(0);
  } catch (error) {
    console.error('Failed to close database connections:', error);
    process.exit(1);
  }
});

// Démarrer le serveur
startServer();