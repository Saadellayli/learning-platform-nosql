const mongoService = require('../services/mongoService');

async function createReview(req, res, next) {
  try {
    const reviewData = req.body;
    const result = await mongoService.createReview(reviewData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function getReviews(req, res, next) {
  try {
    const reviews = await mongoService.getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createReview,
  getReviews
};
