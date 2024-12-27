const express = require('express');
const router = express.Router();

const workData = require('../Controllers/workController.js');

router.get('/work', workData.getAllData);

module.exports = router;

