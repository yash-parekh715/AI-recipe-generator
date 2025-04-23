// const Item = require('../models/Item');

// // @desc    Add an item
// // @route   POST /api/items/add
// // @access  Public
// exports.addItem = async (req, res) => {
//     const { item } = req.body;

//     if (!item) {
//         return res.status(400).json({ message: 'Item is required' });
//     }

//     try {
//         const newItem = new Item({ name: item });
//         await newItem.save();
//         res.status(201).json(newItem);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// // @desc    Fetch all items
// // @route   GET /api/items
// // @access  Public
// exports.getItems = async (req, res) => {
//     try {
//         const items = await Item.find();
//         res.status(200).json(items);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

const Item = require("../models/Item");

// @desc    Add an item
// @route   POST /api/items/add
// @access  Public
exports.addItem = async (req, res) => {
  const { item } = req.body;

  if (!item) {
    return res.status(400).json({ message: "Item is required" });
  }

  try {
    // Fix: use 'item' field instead of 'name'
    const newItem = new Item({ item: item });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Fetch all items
// @route   GET /api/items
// @access  Public
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
