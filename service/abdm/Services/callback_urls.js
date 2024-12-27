const express = require('express')
const router = express.Router()
const { readfile, Write2file } = require('../read_or_write2KeyValues.js')
const { CareContext_onDiscover } = require("../M2/HIP/Discovery & Linking/CareContext_onDiscover.js")
const { CareContext_onInit } = require("../M2/HIP/Discovery & Linking/careContext_onInit.js")
const { CareContext_onConfirm } = require("../M2/HIP/Discovery & Linking/careContext_onConfirm.js")
const { HIP_onNotify } = require("../M2/HIP/Store Consent Artefacts/HIP_onNotify.js")


//Call-back post functions
//===========================================================================================================================================================
router.post('/v0.5/users/auth/on-fetch-modes', (req, res) => {
   console.log('Received on-fetch-modes callback:', req.body);
   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment

});


router.post('/v0.5/users/auth/on-init', (req, res) => {
   console.log('Received HIP_on_init_auth callback:', req.body);
   const transactionId = req.body.auth.transactionId;
   Write2file('transactionId', transactionId);
   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment

});

// API to submit the token that was sent by HIP during the link request.
router.post('/v0.5/links/link/confirm', (req, res) => {
   console.log('Received HIP_on_init_auth callback:', req.body);
   const token = req.body.confirmation.token;
   Write2file('transactionId', token);
   Write2file('linkRefNumber', req.body.confirmation.linkRefNumber);
   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
   CareContext_onConfirm()
});


router.post('/v0.5/users/auth/on-confirm', (req, res) => {
   console.log('Received HIP_on_confirm callback:', req.body);
   Write2file('User_AccessToken', req.body.accessToken);
   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment	
});


router.post('/v0.5/links/link/on-add-contexts', (req, res) => {
   console.log('Received on Add Contexts callback:', req.body);
   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
});


// Discover patient's accounts request from ----> Gateway 
router.post('/v0.5/care-contexts/discover', (req, res) => {
   console.log('Received from Gateway --> care-contexts discover:', req.body);
   Write2file('Discover_id', req.body.patient.id)
   Write2file('transactionId', req.body.transactionId)
   Write2file('requestId', req.body.requestId)
   CareContext_onDiscover()
   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
});


// Link patient's accounts request from ----> Gateway
router.post('/v0.5/links/link/init', (req, res) => {
   console.log('Received from Gateway --> links INIT', req.body);
   Write2file('id', req.body.patient.id)
   Write2file('referenceNumber', req.body.patient.referenceNumber)
   Write2file('transactionId', req.body.transactionId)
   Write2file('requestId', req.body.requestId)
   CareContext_onInit(req.body.patient.careContexts)
   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
});


// Link patient's accounts request from ----> Gateway
router.post('/v0.5/links/link/confirm', (req, res) => {
   console.log('Received from Gateway -->link/confirm', req.body)
   Write2file('linkRefNumber', req.body.confirmation.linkRefNumber)
   Write2file('token', req.body.confirmation.token)
   Write2file('requestId', req.body.requestId)
   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
});


// Consent Notification
router.post('/v0.5/consents/hip/notify', (req, res) => {
   console.log('Received from Gateway -->links INIT', req.body);
   Write2file('id', req.body.patient.id)
   Write2file('transactionId', req.body.transactionId)
   Write2file('requestId', req.body.requestId)
   Write2file('consentId', req.body.notification.consentId)
   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
   HIP_onNotify()
});


// API called by HIE-CM to request health information from HIP against a validated consent artefact.

const { healthInfo_onRequest } = require("../M2/HIP/RequestHeatlhRecords/HealthInfo_onRequest.js")
router.post('/v0.5/health-information/hip/request', (req, res) => {
   console.log('Received from Gateway -->hip/request', req.body);
   Write2file('transactionId', req.body.transactionId)
   Write2file('requestId', req.body.requestId)
   Write2file('requestId', req.body.hiRequest.consent.id)
   Write2file('parameters', req.body.hiRequest.keyMaterial.dhPublicKey.parameters)
   Write2file('keyValue', req.body.hiRequest.keyMaterial.dhPublicKey.keyValue)
   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
   healthInfo_onRequest()
});


// health-information/transfer
router.post('/v0.5/health-information/transfer', (req, res) => {
   console.log('Received from Gateway --> health-information/transfer', req.body);
   Write2file('transactionId', req.body.transactionId)
   Write2file('requestId', req.body.requestId)
   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
});


// consent-requests/on-init
router.post('/v0.5/consent-requests/on-init', (req, res) => {
   console.log('Received from Gateway --> health-information/transfer', req.body);
   Write2file('transactionId', req.body.transactionId)
   Write2file('requestId', req.body.requestId)
   Write2file('consentRequest', req.body.consentRequest.id)
   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
});

// consent-requests/on-status
router.post('/v0.5/consent-requests/on-status', (req, res) => {
   console.log('Received from Gateway --> consent-requests/on-status', req.body);
   Write2file('consentRequest', req.body.consentRequest.id)
   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
});

// consents/hiu/notify
router.post('/v0.5/consents/hiu/notify', (req, res) => {
   console.log('Received from Gateway --> consents/hiu/notify', req.body);
   Write2file('consentRequest', req.body.notification.consentRequestId)
   Write2file('consentArtefacts', req.body.consentArtefacts.id)
   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
});

// consents on Fetch
router.post('/v0.5/consents/on-fetch', (req, res) => {
   console.log('Received from Gateway --> consents/on-fetch', req.body);
   // Write2file('consentRequest', req.body.notification.consentRequestId)
   // Write2file('consentArtefacts', req.body.consentArtefacts.id)
   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
});

// health-information/hiu/on-request
router.post('/v0.5/health-information/hiu/on-request', (req, res) => {
   console.log('Received from Gateway --> consents/on-fetch', req.body);
   // Write2file('consentRequest', req.body.notification.consentRequestId)
   // Write2file('consentArtefacts', req.body.consentArtefacts.id)
   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
});

// data/push
router.post('/v0.5/data/push', (req, res) => {
   console.log('Received from Gateway --> consents/on-fetch', req.body);
   // Write2file('consentRequest', req.body.notification.consentRequestId)
   // Write2file('consentArtefacts', req.body.consentArtefacts.id)
   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
});



router.get('/status', (req, res) => {
   console.log('status', req.body);
   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
});


//============================================================================================================================================================

module.exports = router
