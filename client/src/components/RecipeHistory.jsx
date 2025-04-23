// import React, { useEffect, useState } from "react";
// import { fetchRecipeHistory } from "../api/index";

// const RecipeHistory = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [expandedRecipeId, setExpandedRecipeId] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       setLoading(true);
//       try {
//         const response = await fetchRecipeHistory();
//         setRecipes(response);
//         setError(null);
//       } catch (err) {
//         setError("Failed to fetch recipe history");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     })}`;
//   };

//   const toggleExpand = (id) => {
//     setExpandedRecipeId(expandedRecipeId === id ? null : id);
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4 flex items-center">
//         <span className="text-purple-600 mr-2">📋</span>
//         Recipe History
//       </h2>

//       {loading ? (
//         <div className="text-center py-8 text-gray-500">Loading recipes...</div>
//       ) : error ? (
//         <div className="text-center py-8 text-red-500">{error}</div>
//       ) : recipes.length === 0 ? (
//         <div className="text-center py-8 text-gray-500">
//           No recipe history yet
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {recipes.map((recipe) => (
//             <div
//               key={recipe._id}
//               className="border border-gray-200 rounded-lg overflow-hidden"
//             >
//               <div
//                 className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
//                 onClick={() => toggleExpand(recipe._id)}
//               >
//                 <h3 className="font-medium">{recipe.title}</h3>
//                 <div className="flex items-center space-x-2">
//                   <div className="text-sm text-gray-500 flex items-center">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 mr-1"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                     {formatDate(recipe.createdAt)}
//                   </div>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className={`h-5 w-5 transition-transform ${
//                       expandedRecipeId === recipe._id
//                         ? "transform rotate-180"
//                         : ""
//                     }`}
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </div>
//               </div>

//               {expandedRecipeId === recipe._id && (
//                 <div className="p-4 border-t border-gray-200">
//                   <div className="mb-3">
//                     <h4 className="font-medium text-sm text-gray-500 mb-1">
//                       Ingredients:
//                     </h4>
//                     <div className="flex flex-wrap gap-1">
//                       {recipe.basketItems.map((item, index) => (
//                         <span
//                           key={index}
//                           className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded"
//                         >
//                           {item}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="font-medium text-sm text-gray-500 mb-1">
//                       Instructions:
//                     </h4>
//                     <p className="text-sm whitespace-pre-line">
//                       {recipe.instructions}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeHistory;

import React, { useEffect, useState } from "react";
import { fetchRecipeHistory } from "../api/index";

const RecipeHistory = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetchRecipeHistory();
        setRecipes(response);
        setError(null);
      } catch (err) {
        setError("Failed to fetch recipe history");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      year: date.getFullYear(),
    };
  };

  const toggleExpand = (id) => {
    setExpandedRecipeId(expandedRecipeId === id ? null : id);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <span className="text-purple-600 mr-2">📋</span>
        Recipe History
      </h2>

      {loading ? (
        <div className="text-center py-12 text-gray-500">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mb-2"></div>
          <p>Loading your culinary creations...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 bg-red-50 rounded-lg border border-red-100">
          <div className="text-red-500 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-red-800">{error}</p>
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
          <div className="text-gray-400 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">No recipe history yet</p>
          <p className="text-gray-500 mt-1 max-w-md mx-auto">
            Your culinary creations will appear here after you generate your
            first recipe.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {recipes.map((recipe) => {
            const formattedDate = formatDate(recipe.createdAt);
            return (
              <div
                key={recipe._id}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow duration-200"
              >
                <div
                  className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleExpand(recipe._id)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        expandedRecipeId === recipe._id
                          ? "bg-purple-100 text-purple-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span role="img" aria-label="recipe" className="text-lg">
                        🍳
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {recipe.title}
                      </h3>
                      <div className="text-xs text-gray-500 flex items-center">
                        <span>
                          {formattedDate.date}, {formattedDate.year}
                        </span>
                        <span className="mx-1">•</span>
                        <span>{formattedDate.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="hidden md:flex items-center mr-3">
                      <span className="text-xs text-gray-500 mr-2">
                        Ingredients:
                      </span>
                      <div className="flex -space-x-1">
                        {recipe.basketItems.slice(0, 3).map((item, idx) => (
                          <div
                            key={idx}
                            className="w-6 h-6 rounded-full bg-purple-100 border border-white flex items-center justify-center"
                            title={item}
                          >
                            <span className="text-xs text-purple-800">
                              {item.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        ))}
                        {recipe.basketItems.length > 3 && (
                          <div className="w-6 h-6 rounded-full bg-gray-100 border border-white flex items-center justify-center">
                            <span className="text-xs text-gray-800">
                              +{recipe.basketItems.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition-transform duration-200 text-gray-400 ${
                        expandedRecipeId === recipe._id
                          ? "transform rotate-180"
                          : ""
                      }`}
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
                  </div>
                </div>

                {expandedRecipeId === recipe._id && (
                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-2">
                          Ingredients:
                        </h4>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {recipe.basketItems.map((item, index) => (
                            <span
                              key={index}
                              className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      {recipe.ingredients && recipe.ingredients.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm text-gray-500 mb-2">
                            Full Recipe Ingredients:
                          </h4>
                          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                            {recipe.ingredients.map((ingredient, index) => (
                              <li key={index}>{ingredient}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-2">
                        Instructions:
                      </h4>
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                          {recipe.instructions}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecipeHistory;
