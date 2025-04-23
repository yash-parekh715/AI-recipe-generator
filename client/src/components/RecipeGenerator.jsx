import React, { useState, useEffect } from 'react';
import { generateRecipe, fetchItems, fetchRecipeHistory } from '../api/index';

const RecipeGenerator = () => {
    const [items, setItems] = useState([]);
    const [basket, setBasket] = useState([]);
    const [recipeHistory, setRecipeHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [generatedRecipe, setGeneratedRecipe] = useState(null);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const fetchedItems = await fetchItems();
                setItems(fetchedItems);
            } catch (err) {
                setError('Failed to fetch items');
            }
        };

        const loadRecipeHistory = async () => {
            try {
                const history = await fetchRecipeHistory();
                setRecipeHistory(history);
            } catch (err) {
                setError('Failed to fetch recipe history');
            }
        };

        loadItems();
        loadRecipeHistory();
    }, []);

    const addToBasket = (item) => {
        setBasket((prevBasket) => [...prevBasket, item]);
    };

    const generateRecipeHandler = async () => {
        setLoading(true);
        setError(null);
        try {
            const recipe = await generateRecipe(basket);
            setGeneratedRecipe(recipe);
            setBasket([]); // Clear basket after generating recipe
        } catch (err) {
            setError('Failed to generate recipe');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Recipe Generator</h1>
            <div className="w-full max-w-md mb-4">
                <h2 className="text-xl font-semibold">Item Manager</h2>
                <ul className="border rounded-lg overflow-y-scroll max-h-40">
                    {items.map((item) => (
                        <li key={item._id} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => addToBasket(item.name)}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full max-w-md mb-4">
                <h2 className="text-xl font-semibold">Basket</h2>
                <ul className="border rounded-lg">
                    {basket.map((item, index) => (
                        <li key={index} className="p-2">{item}</li>
                    ))}
                </ul>
                <p className="mt-2">Total Items: {basket.length}</p>
            </div>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={generateRecipeHandler}
                disabled={loading || basket.length === 0}
            >
                {loading ? 'Generating...' : 'Generate Recipe'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {generatedRecipe && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Generated Recipe</h2>
                    <h3 className="font-bold">{generatedRecipe.title}</h3>
                    <h4>Ingredients:</h4>
                    <ul>
                        {generatedRecipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h4>Instructions:</h4>
                    <p>{generatedRecipe.instructions}</p>
                </div>
            )}
            <div className="w-full max-w-md mt-4">
                <h2 className="text-xl font-semibold">Recipe History</h2>
                <ul className="border rounded-lg">
                    {recipeHistory.map((recipe) => (
                        <li key={recipe._id} className="p-2 border-b">
                            <h3 className="font-bold">{recipe.title}</h3>
                            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
                            <p>{recipe.instructions}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RecipeGenerator;