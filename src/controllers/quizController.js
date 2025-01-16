const mongoService = require('../services/mongoService');

async function createQuiz(req, res) {
  try {
    const quizData = req.body;
    const result = await mongoService.createQuiz(quizData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quiz' });
  }
}

async function getQuizzes(req, res) {
  try {
    const quizzes = await mongoService.getQuizzes();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
}

module.exports = {
  createQuiz,
  getQuizzes
};
