const express = require('express');
const router = express.Router();

const recordShare = require('../Record_Share/recordShare.js');
const recordOnShare = require('../Record_Share/recordOnShare.js');

router.post('/patient-share/record-share', recordShare);
router.post('/patient-share/record-on-share', recordOnShare);


module.exports = router;

