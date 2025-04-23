// import React from 'react';

// const Basket = ({ items, onRemove }) => {
//     return (
//         <div className="bg-white shadow-md rounded-lg p-4">
//             <h2 className="text-xl font-bold mb-4">Basket</h2>
//             {items.length === 0 ? (
//                 <p className="text-gray-500">Your basket is empty.</p>
//             ) : (
//                 <ul className="space-y-2">
//                     {items.map((item, index) => (
//                         <li key={index} className="flex justify-between items-center">
//                             <span className="text-lg">{item}</span>
//                             <button
//                                 onClick={() => onRemove(item)}
//                                 className="bg-red-500 text-white px-2 py-1 rounded"
//                             >
//                                 Remove
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//             <div className="mt-4">
//                 <span className="font-semibold">Total Items: {items.length}</span>
//             </div>
//         </div>
//     );
// };

// export default Basket;

import React from "react";

const Basket = ({ items, onRemove, onGenerate, isLoading }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <span className="text-purple-600 mr-2">🛒</span>
        Your Basket
        <span className="ml-auto bg-purple-600 text-white text-sm rounded-full px-2 py-0.5">
          {items.length} items
        </span>
      </h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          Your basket is empty. Add items from your pantry!
        </p>
      ) : (
        <div className="mb-4 space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 rounded-md p-3"
            >
              <span>{item}</span>
              <button
                onClick={() => onRemove(item)}
                className="text-red-400 hover:text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onGenerate}
        disabled={isLoading || items.length === 0}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-md text-center font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Generating..." : "Generate Recipe"}
      </button>
    </div>
  );
};

export default Basket;
