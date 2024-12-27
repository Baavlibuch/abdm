const express = require('express');
const router = express.Router();

const stateData = require('../Controllers/stateController.js');

router.get('/state', stateData.getAllData);

module.exports = router;

