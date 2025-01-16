const express = require('express');
const router = express.Router();

const { getAllColleges, getAllCouncils, getAllDegrees, getAllSpeciality } = require('../Controllers/dentistController.js');

// Route to fetch all Ayurveda Colleges
router.get('/colleges', getAllColleges);

// Route to fetch all Ayurveda Councils
router.get('/councils', getAllCouncils);

// Route to fetch all Ayurveda Degrees
router.get('/degrees', getAllDegrees);

// Route to fetch all Dentist Speciality
router.get('/speciality', getAllSpeciality);

module.exports = router;

