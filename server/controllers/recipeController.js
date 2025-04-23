// const Recipe = require('../models/Recipe');
// const Item = require('../models/Item');
// const axios = require('axios');

// const generateRecipe = async (req, res) => {
//     const { items } = req.body;

//     if (!items || items.length === 0) {
//         return res.status(400).json({ message: 'No items provided' });
//     }

//     try {
//         const response = await axios.post('https://api.gemini.com/generate-recipe', {
//             model: 'gemini-2.0-flash',
//             items: items
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
//             }
//         });

//         const recipeData = response.data;

//         const newRecipe = new Recipe({
//             title: recipeData.title,
//             ingredients: recipeData.ingredients,
//             instructions: recipeData.instructions,
//             basketItems: items
//         });

//         await newRecipe.save();

//         res.status(201).json(newRecipe);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error generating recipe' });
//     }
// };

// const getRecipeHistory = async (req, res) => {
//     try {
//         const recipes = await Recipe.find().populate('basketItems');
//         res.status(200).json(recipes);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching recipe history' });
//     }
// };

// module.exports = {
//     generateRecipe,
//     getRecipeHistory
// };

const Recipe = require("../models/Recipe");
const Item = require("../models/Item");
const axios = require("axios");
const geminiConfig = require("../config/geminiConfig");

// const generateRecipe = async (req, res) => {
//   const { items } = req.body;

//   if (!items || items.length === 0) {
//     return res.status(400).json({ message: "No items provided" });
//   }

//   try {
//     const response = await axios.post(
//       geminiConfig.BASE_URL,
//       {
//         contents: [
//           {
//             parts: [
//               {
//                 text: `Create a recipe using these ingredients: ${items.join(
//                   ", "
//                 )}`,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${geminiConfig.API_KEY}`,
//         },
//       }
//     );

//     // Parse the response from Gemini API
//     const generatedText = response.data.candidates[0].content.parts[0].text;

//     // Extract recipe components (this is a simple approach, might need more parsing logic)
//     const titleMatch = generatedText.match(/^#\s*(.+?)(?:\n|$)/m);
//     const title = titleMatch ? titleMatch[1] : "Generated Recipe";

//     const ingredientsList = generatedText.match(
//       /(?:Ingredients:|INGREDIENTS:)([\s\S]*?)(?:Instructions:|INSTRUCTIONS:|Directions:|DIRECTIONS:)/i
//     );
//     const ingredients = ingredientsList
//       ? ingredientsList[1]
//           .split("\n")
//           .map((item) => item.trim())
//           .filter((item) => item && !item.startsWith("#"))
//       : items;

//     const instructionsMatch = generatedText.match(
//       /(?:Instructions:|INSTRUCTIONS:|Directions:|DIRECTIONS:)([\s\S]*?)(?:$|#)/i
//     );
//     const instructions = instructionsMatch
//       ? instructionsMatch[1].trim()
//       : generatedText;

//     const newRecipe = new Recipe({
//       title: title,
//       ingredients: ingredients,
//       instructions: instructions,
//       basketItems: items,
//     });

//     await newRecipe.save();

//     res.status(201).json(newRecipe);
//   } catch (error) {
//     console.error("Recipe generation error:", error);
//     res.status(500).json({
//       message: "Error generating recipe",
//       error: error.response?.data || error.message,
//     });
//   }
// };

const generateRecipe = async (req, res) => {
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items provided" });
  }

  try {
    // Change to query parameter authentication instead of Authorization header
    const response = await axios.post(
      `${geminiConfig.BASE_URL}?key=${geminiConfig.API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Create a recipe using these ingredients: ${items.join(
                  ", "
                )}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          // Remove the Authorization header
        },
      }
    );

    // Rest of your code stays the same
    const generatedText = response.data.candidates[0].content.parts[0].text;

    // Existing parsing code...
    const titleMatch = generatedText.match(/^#\s*(.+?)(?:\n|$)/m);
    const title = titleMatch ? titleMatch[1] : "Generated Recipe";

    const ingredientsList = generatedText.match(
      /(?:Ingredients:|INGREDIENTS:)([\s\S]*?)(?:Instructions:|INSTRUCTIONS:|Directions:|DIRECTIONS:)/i
    );
    const ingredients = ingredientsList
      ? ingredientsList[1]
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item && !item.startsWith("#"))
      : items;

    const instructionsMatch = generatedText.match(
      /(?:Instructions:|INSTRUCTIONS:|Directions:|DIRECTIONS:)([\s\S]*?)(?:$|#)/i
    );
    const instructions = instructionsMatch
      ? instructionsMatch[1].trim()
      : generatedText;

    const newRecipe = new Recipe({
      title: title,
      ingredients: ingredients,
      instructions: instructions,
      basketItems: items,
    });

    await newRecipe.save();

    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Recipe generation error:", error);
    res.status(500).json({
      message: "Error generating recipe",
      error: error.response?.data || error.message,
    });
  }
};

const getRecipeHistory = async (req, res) => {
  try {
    // Since basketItems is an array of strings, not references, we don't use populate
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recipe history" });
  }
};

module.exports = {
  generateRecipe,
  getRecipeHistory,
};
