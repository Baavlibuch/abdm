const express = require('express');
const router = express.Router();

const { getAllColleges, getAllCouncils, getAllDegrees, getAllSpeciality } = require('../Controllers/siddhaController.js');

router.get('/colleges', getAllColleges);

router.get('/councils', getAllCouncils);

router.get('/degrees', getAllDegrees);

router.get('/speciality', getAllSpeciality);

module.exports = router;

