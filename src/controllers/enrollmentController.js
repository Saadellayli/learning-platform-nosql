// Exemple de contrôleur d'inscription
exports.enrollUser = (req, res, next) => {
  try {
    // Logique d'inscription
    res.send('Inscription réussie');
  } catch (error) {
    next(error);
  }
};

exports.getEnrollments = (req, res, next) => {
  try {
    // Logique pour obtenir les inscriptions
    res.send('Liste des inscriptions');
  } catch (error) {
    next(error);
  }
};
