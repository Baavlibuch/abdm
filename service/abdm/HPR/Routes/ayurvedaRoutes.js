const express = require('express');
const router = express.Router();

const { getAllColleges, getAllCouncils, getAllDegrees } = require('../Controllers/ayurvedaController.js');

// Route to fetch all Ayurveda Colleges
router.get('/colleges', getAllColleges);

// Route to fetch all Ayurveda Councils
router.get('/councils', getAllCouncils);

// Route to fetch all Ayurveda Degrees
router.get('/degrees', getAllDegrees);

module.exports = router;

