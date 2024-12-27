const express = require('express');
const router = express.Router();

const consentRequestInit = require('../Consent_Flow/consentRequestInit.js');
const consentOnNotify = require('../Consent_Flow/consentOnNotify.js');
const consentStatus = require('../Consent_Flow/consentStatus.js');
const consentFetch = require('../Consent_Flow/consentFetch.js');

router.post('/consent/request/init', consentRequestInit);
router.post('/hiu/consent/on-notify', consentOnNotify);
router.post('/consent/request/status', consentStatus);
router.post('/consent/request/fetch', consentFetch);

module.exports = router;

