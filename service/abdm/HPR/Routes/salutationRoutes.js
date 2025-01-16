const express = require('express');
const router = express.Router();

const salutationData = require('../Controllers/salutationController.js');

router.get('/salutation', salutationData.getAllData);

module.exports = router;
