const mongoService = require('../services/mongoService');

async function createReview(req, res) {
  try {
    const reviewData = req.body;
    const result = await mongoService.createReview(reviewData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
}

async function getReviews(req, res) {
  try {
    const reviews = await mongoService.getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}

module.exports = {
  createReview,
  getReviews
};
