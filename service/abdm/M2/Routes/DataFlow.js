const express = require('express');
const router = express.Router();

const consentHIPnotify = require('../Data_Flow/concentHIPnotify.js');
const healthInfoOnRequest = require('../Data_Flow/healthInfoOnRequest.js');
const HIPpushData = require('../Data_Flow/HIPpushData.js');
const healthInfoNotify = require('../Data_Flow/healthInfoNotify.js');

router.get('/request/hip/on-notify', consentHIPnotify);
router.get('/health-information/on-request', healthInfoOnRequest);
router.post('/push/data/notification', HIPpushData);
router.post('/data-flow/health-information/notify', healthInfoNotify);


module.exports = router;

