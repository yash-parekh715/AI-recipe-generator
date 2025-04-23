const express = require('express');
const { addItem, getItems } = require('../controllers/itemController');

const router = express.Router();

router.post('/add', addItem);
router.get('/', getItems);

module.exports = router;