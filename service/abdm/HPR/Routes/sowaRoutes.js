const express = require('express');
const router = express.Router();

const { getAllColleges, getAllCouncils, getAllDegrees } = require('../Controllers/sowaController.js');

router.get('/colleges', getAllColleges);

router.get('/councils', getAllCouncils);

router.get('/degrees', getAllDegrees);

module.exports = router;

