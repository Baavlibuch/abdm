const express = require('express');
const router = express.Router();

const consentHIPnotify = require('../Data_Flow/concentHIPnotify.js');
const healthInfoOnRequest = require('../Data_Flow/healthInfoOnRequest.js');
const HIPpushData = require('../Data_Flow/HIPpushData.js');
const healthInfoNotify = require('../Data_Flow/healthInfoNotify.js');

<<<<<<< HEAD
router.get('/request/hip/on-notify', consentHIPnotify);
router.get('/health-information/on-request', healthInfoOnRequest);
=======
router.post('/request/hip/on-notify', consentHIPnotify);
router.post('/health-information/on-request', healthInfoOnRequest);
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
router.post('/push/data/notification', HIPpushData);
router.post('/data-flow/health-information/notify', healthInfoNotify);


module.exports = router;

