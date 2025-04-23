const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Route to generate a recipe based on basket items
router.post('/generate-recipe', recipeController.generateRecipe);

// Route to get recipe history
router.get('/history', recipeController.getRecipeHistory);

module.exports = router;