const mongoService = require('../services/mongoService');

async function createQuiz(req, res, next) {
  try {
    const quizData = req.body;
    const result = await mongoService.createQuiz(quizData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function getQuizzes(req, res, next) {
  try {
    const quizzes = await mongoService.getQuizzes();
    res.status(200).json(quizzes);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createQuiz,
  getQuizzes
};
