const express = require('express');
const router = express.Router();

const countryData = require('../Controllers/countryController.js');

router.get('/country', countryData.getAllData);

module.exports = router;

