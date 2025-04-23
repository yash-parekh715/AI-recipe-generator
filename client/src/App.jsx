import React, { useState, useEffect } from "react";
import ItemManager from "./components/ItemManager";
import ReactMarkdown from "react-markdown";
import Basket from "./components/Basket";
import RecipeHistory from "./components/RecipeHistory";
import { generateRecipe } from "./api/index";
import Toast from "./components/Toast";

const App = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const handleAddToBasket = (item) => {
    setBasketItems((prev) => [...prev, item]);
    setToast({ message: `${item} added to your basket`, type: "info" });

    // Hide toast after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleRemoveFromBasket = (itemToRemove) => {
    const index = basketItems.indexOf(itemToRemove);
    if (index !== -1) {
      const newBasket = [...basketItems];
      newBasket.splice(index, 1);
      setBasketItems(newBasket);

      setToast({
        message: `${itemToRemove} removed from your basket`,
        type: "info",
      });
      setTimeout(() => {
        setToast(null);
      }, 3000);
    }
  };

  const handleGenerateRecipe = async () => {
    if (basketItems.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const recipe = await generateRecipe(basketItems);
      setGeneratedRecipe(recipe);
      setBasketItems([]);
    } catch (err) {
      setError("Failed to generate recipe. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Poppins']">
      {toast && <Toast message={toast.message} type={toast.type} />}

      <header className="py-6 px-8 bg-white shadow-sm">
        <div className="container mx-auto flex items-center">
          <div className="text-3xl mr-2 text-purple-600">👨‍🍳</div>
          <h1 className="text-2xl font-bold">
            Reference UI - <span className="text-black">sRecipe</span>{" "}
            <span className="text-purple-600">Generator</span>
          </h1>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <ItemManager onAddToBasket={handleAddToBasket} />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <Basket
                items={basketItems}
                onRemove={handleRemoveFromBasket}
                onGenerate={handleGenerateRecipe}
                isLoading={loading}
              />
            </div>
            {/* {generatedRecipe && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <span className="text-purple-600 mr-2">🍽️</span>
                  Generated Recipe
                </h2>
                <h3 className="text-xl font-semibold mb-3">
                  {generatedRecipe.title}
                </h3>

                <div className="mb-4">
                  <h4 className="font-semibold text-lg mb-2">Ingredients:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {generatedRecipe.ingredients?.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">Instructions:</h4>
                  <p className="whitespace-pre-line">
                    {generatedRecipe.instructions}
                  </p>
                </div>
              </div>
            )} */}

            {generatedRecipe && (
              <div className="bg-white rounded-lg shadow p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -mr-16 -mt-16 z-0"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-50 rounded-full -ml-12 -mb-12 z-0"></div>

                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <span className="text-purple-600 mr-2">🍽️</span>
                    Generated Recipe
                  </h2>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                    {generatedRecipe.title}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-lg mb-3 text-purple-800 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                        Ingredients
                      </h4>
                      <ul className="space-y-2 pl-2">
                        {generatedRecipe.ingredients?.map(
                          (ingredient, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-purple-600 mr-2">•</span>
                              <span className="text-gray-700">
                                {ingredient}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-lg mb-3 text-gray-700 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        From Your Pantry
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedRecipe.basketItems?.map((item, index) => (
                          <span
                            key={index}
                            className="bg-purple-100 text-purple-800 px-2 py-1 text-sm rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-lg mb-3 text-gray-800 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      Instructions
                    </h4>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                        {generatedRecipe.instructions}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            <RecipeHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
