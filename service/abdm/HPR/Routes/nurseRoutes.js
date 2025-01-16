const express = require('express');
const router = express.Router();

const { getAllColleges, getAllCouncils, getAllCourses, getAllSpeciality, getAllBoards, getAllCategories } = require('../Controllers/nurseController.js');

router.get('/colleges', getAllColleges);

router.get('/councils', getAllCouncils);

router.get('/courses', getAllCourses);

router.get('/speciality', getAllSpeciality);

router.get('/boards', getAllBoards);

router.get('/categories', getAllCategories);

module.exports = router;

