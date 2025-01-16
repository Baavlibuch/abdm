const express = require('express');
const router = express.Router();

const medicineData = require('../Controllers/medicineController.js');

router.get('/medicine', medicineData.getAllData);

module.exports = router;

