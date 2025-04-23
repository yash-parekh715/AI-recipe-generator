const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;