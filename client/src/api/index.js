import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/items`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const addItem = async (item) => {
  try {
    const response = await axios.post(`${API_URL}/items/add`, { item });
    return response.data;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

export const generateRecipe = async (items) => {
  try {
    const response = await axios.post(`${API_URL}/recipes/generate-recipe`, {
      items,
    });
    return response.data;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw error;
  }
};

export const fetchRecipeHistory = async () => {
  try {
    const response = await axios.get(`${API_URL}/recipes/history`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe history:", error);
    throw error;
  }
};
