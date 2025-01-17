const mongoService = require('../services/mongoService');

async function createCategory(req, res, next) {
  try {
    const categoryData = req.body;
    const result = await mongoService.createCategory(categoryData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function getCategories(req, res, next) {
  try {
    const categories = await mongoService.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createCategory,
  getCategories
};
