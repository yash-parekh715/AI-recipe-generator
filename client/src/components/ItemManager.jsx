// import React, { useState, useEffect } from "react";
// import { fetchItems, addItem } from "../api/index";

// const ItemManager = ({ onAddToBasket }) => {
//   const [items, setItems] = useState([]);
//   const [newItem, setNewItem] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const loadItems = async () => {
//       setLoading(true);
//       try {
//         const fetchedItems = await fetchItems();
//         setItems(fetchedItems);
//         setError(null);
//       } catch (err) {
//         setError("Failed to fetch items");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadItems();
//   }, []);

//   const handleAddItem = async (e) => {
//     e.preventDefault();
//     if (!newItem.trim()) return;

//     setLoading(true);
//     try {
//       const addedItem = await addItem(newItem);
//       setItems((prevItems) => [...prevItems, addedItem]);
//       setNewItem("");
//       setError(null);
//     } catch (err) {
//       setError("Failed to add item");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4">
//       <h2 className="text-xl font-bold mb-4">Item Manager</h2>

//       <form onSubmit={handleAddItem} className="mb-4 flex gap-2">
//         <input
//           type="text"
//           value={newItem}
//           onChange={(e) => setNewItem(e.target.value)}
//           placeholder="Add new item..."
//           className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//         <button
//           type="submit"
//           disabled={loading || !newItem.trim()}
//           className="bg-[#6552FF] hover:bg-[#4e43d6] text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Add
//         </button>
//       </form>

//       {error && <p className="text-red-500 mb-2">{error}</p>}

//       <div className="border rounded-md overflow-hidden">
//         <ul className="max-h-60 overflow-y-auto scrollable">
//           {loading && items.length === 0 ? (
//             <li className="p-3 text-center text-gray-500">Loading items...</li>
//           ) : items.length === 0 ? (
//             <li className="p-3 text-center text-gray-500">
//               No items available
//             </li>
//           ) : (
//             items.map((item) => (
//               <li
//                 key={item._id}
//                 className="p-3 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer transition-colors item"
//                 onClick={() => onAddToBasket(item.item)}
//               >
//                 {item.item}
//               </li>
//             ))
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ItemManager;

import React, { useState, useEffect } from "react";
import { fetchItems, addItem } from "../api/index";

const ItemManager = ({ onAddToBasket }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        const fetchedItems = await fetchItems();
        setItems(fetchedItems);
        setError(null);
      } catch (err) {
        setError("Failed to fetch items");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    setLoading(true);
    try {
      const addedItem = await addItem(newItem);
      setItems((prevItems) => [...prevItems, addedItem]);
      setNewItem("");
      setError(null);
    } catch (err) {
      setError("Failed to add item");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) =>
    item.item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Pantry</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={handleAddItem}
          disabled={loading || !newItem.trim()}
          className="bg-purple-400 hover:bg-purple-500 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <span className="text-xl">+</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search items..."
            className="pl-10 w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {loading && items.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            Loading items...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            {searchQuery ? "No matching items found" : "No items available"}
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-gray-100 hover:bg-gray-200 rounded-md p-3 cursor-pointer transition-colors"
              onClick={() => onAddToBasket(item.item)}
            >
              {item.item}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ItemManager;
