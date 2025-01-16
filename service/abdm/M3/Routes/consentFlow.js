const express = require('express');
const router = express.Router();

const consentRequestInit = require('../Consent_Flow/consentRequestInit.js');
const consentOnNotify = require('../Consent_Flow/consentOnNotify.js');
const consentStatus = require('../Consent_Flow/consentStatus.js');
const consentFetch = require('../Consent_Flow/consentFetch.js');

router.post('/consent/request/init', consentRequestInit);
<<<<<<< HEAD
router.get('/hiu/consent/on-notify', consentOnNotify);
=======
router.post('/hiu/consent/on-notify', consentOnNotify);
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
router.post('/consent/request/status', consentStatus);
router.post('/consent/request/fetch', consentFetch);

module.exports = router;

