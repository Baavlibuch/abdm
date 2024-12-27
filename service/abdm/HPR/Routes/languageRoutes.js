const express = require('express');
const router = express.Router();

const languageData = require('../Controllers/languageController.js');

router.get('/language', languageData.getAllData);

module.exports = router;

