const express = require('express');
const router = express.Router();

const workStatusData = require('../Controllers/workStatusController.js');

router.get('/workstatus', workStatusData.getAllData);

module.exports = router;

