const express = require('express')
const router = express.Router();
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');

router.post('/api/v3/hip/token/on-generate-token', (req, res) => {
    const linkToken = req.body.linkToken;
    const requestId = req.body.response.requestId;
    console.log('LinkToken received', linkToken);
    console.log('requestId received upon generate token', requestId);
    Write2file('linkToken', linkToken);
    Write2file('requestId', requestId);
    res.status(202).send('linkToken callback received');
});

//------------- HIP Initiated Linking Callbacks (start) --------------
router.post('/api/v3/link/on_carecontext', (req, res) => {
    const requestId = req.body.response.requestId;
    const status = req.body.status;
    console.log('request Id received from careContext', requestId);
    Write2file('requestId', requestId);
    res.status(200).send(status);
});

router.post('/api/v3/links/context/on-notify', (req, res) => {
    const requestId = req.body.response.requestId;
    const status = req.body.acknowledgement.status;
    console.log('request Id received from contextUpdate', requestId);
    Write2file('requestId', requestId);
    res.status(200).send(status);
});

router.post('/api/v3/patients/sms/on-notify', (req, res) => {
    const requestId = req.body.response.requestId;
    const status = req.body.status;
    console.log("request Id received from smsNotify", requestId);
    Write2file('requestId', requestId);
    res.status(200).send(status);
});
//------------- HIP Initiated Linking Callbacks (end) --------------

//------------- User Initiated Linking (start) -----------------
router.post('/api/v3/hip/patient/care-context/discover', (req, res) => {
    const transactionId = req.body.transactionId;
    console.log('TransactionId received from patient care-context discover callback', transactionId);
    Write2file('transactionId', transactionId);
    res.status(200).send('TransactionId received');
});

router.post('/api/v3/hiu/patient/care-context/on-discover', (req, res) => {
    const transactionId = req.body.transactionId;
    const count = req.body.patient.count;
    const referenceNumber = req.body.patient.referenceNumber;
    Write2file('transactionId', transactionId);
    Write2file('count', count);
    Write2file('referenceNumber', referenceNumber);
    console.log('tranx id received from care-context/on-discover', transactionId);
    res.status(200).send('Acknowledged');
});

router.post('/api/v3/hip/link/care-context/init', (req, res) => {
    const transactionId = req.body.transactionId;
    const referenceNumber = req.body.patient.referenceNumber;
    Write2file('transactionId', transactionId);
    Write2file('referenceNumber', referenceNumber);
    console.log('callback data received on care-context init');
    res.status(200).send('Acknowledged');
});

router.post('/api/v3/hip/link/care-context/confirm', (req, res) => {
    console.log('OTP Confirmed for care-context confirm');
    res.status(200).send('Acknowledged');
});

router.post('/api/v3/hiu/patient/care-context/on-confirm', (req, res) => {
    const referenceNumber = req.body.patient.referenceNumber;
    const count = req.body.patient.count;
    const requestId = req.body.response.requestId;
    Write2file('referenceNumber', referenceNumber);
    Write2file('count', count);
    Write2file('requestId', requestId);
    console.log('Callback received from care-context on-confirm');
    res.status(200).send('Acknowledged');
});
//------------- User Initiated Linking (end) -----------------

//------------- Data Flow (start) -----------------
router.post('/api/v3/consent/request/hip/notify', (req, res) => {
    const status = req.body.notification.status;
    const consentId = req.body.notification.consentId;
    Write2file('requestStatus', status);
    Write2file('consentId', consentId);
    console.log('Callback received from hip notify');
    res.status(200).send('Acknowledged');
});

router.post('/api/v3/hip/health-information/request', (req, res) => {
    const consentId = req.body.hiRequest.consent.id;
    Write2file('consentId', consentId);
    console.log('Callback received from health-information request');
    res.status(200).send('Acknowledged');
});
//------------- Data Flow (end) -----------------

//------------- Scan and Profile Share  (start) -----------------
router.post('/api/v3/hip/patient/share', (req, res) => {
    console.log('callback patient share successful');
    res.status(200).send('Acknowledged');
});

router.post('/api/v3/hiu/patient/on-share', (req, res) => {
    const requestId = req.body.response.requestId;
    Write2file('requestId', requestId);
    console.log('callback patient on-share successful');
    res.status(200).send('Acknowledged');
});

router.post('/api/v3/hip/patient/share', (req, res) => {
    console.log("patient share callback successful");
    res.status(200).send('Acknowledged');
});

router.post('/api/v3/hiu/patient/share', (req, res) => {
    const requestId = req.body.response.requestId;
    Write2file('requestId', requestId);
    console.log("hiu patient share callback successful");
    res.status(200).send('Acknowledged');
});
//------------- Scan and Profile Share  (end) -----------------

//------------- Scan and Pay  (start) -----------------
router.post('/api/v3/hip/patient/share', (req, res) => {
    console.log("hiu patient share for payment callback successful");
    res.status(200).send('Acknowledged');
});

router.post('/api/v3/hiu/patient/on-share', (req, res) => {
    console.log("hiu patient on-share for payment callback successful");
    res.status(200).send('Acknowledged');
});
//------------- Scan and Pay  (end) -----------------


module.exports = router