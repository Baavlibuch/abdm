const express = require('express');
const router = express.Router();

const notWorkingData = require('../Controllers/notWorkingController.js');

router.get('/notworking', notWorkingData.getAllData);

module.exports = router;

