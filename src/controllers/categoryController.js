const mongoService = require('../services/mongoService');

async function createCategory(req, res) {
  try {
    const categoryData = req.body;
    const result = await mongoService.createCategory(categoryData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
}

async function getCategories(req, res) {
  try {
    const categories = await mongoService.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}

module.exports = {
  createCategory,
  getCategories
};
