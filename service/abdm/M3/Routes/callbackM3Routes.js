const express = require('express')
const router = express.Router();
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');

//---------------- Consent Flow (start) ------------------
router.post('/api/v3/hiu/consent/request/on-init', (req, res) => {
    const consentId = req.body.consentRequest.id;
    const requestId = req.body.response.requestId;
    Write2file('consentRequestId', consentId);
    Write2file('requestId', requestId);
    console.log('callback for consent request successful');
    res.status(202).send('Acknowledged');
});

router.post('/api/v3/hiu/consent/request/notify', (req, res) => {
    const status = req.body.notification.status;
    const consentId = req.body.notification.consentRequestId;
    const consentArtefactId = req.body.consentArtefacts.id;
    Write2file('consentRequestId', consentId);
    Write2file('consentStatus', status);
    Write2file('consentArtefactId', consentArtefactId);
    console.log('consent notification received');
    res.status(202).send('Acknowledged');
});

router.post('/api/v3/hiu/consent/request/on-status', (req, res) => {
    const status = req.body.consentRequest.status;
    const consentId = req.body.consentRequest.id;
    const requestId = req.body.response.requestId;
    Write2file('consentRequestId', consentId);
    Write2file('consentStatus', status);
    Write2file('requestId', requestId);
    console.log('callback for consent request on-status received');
    res.status(202).send('Acknowledged');
});

router.post('/api/v3/hiu/consent/on-fetch', (req, res) => {
    const consentId = req.body.consent.consentDetail.consentId;
    Write2file('consentId', consentId);
    console.log('callback for on-fetch received');
    res.status(202).send('Acknowledged');
});

router.post('/api/v3/hiu/health-information/on-request', (req, res) => {
    const transactionId = req.body.hiRequest.transactionId;
    const sessionStatus = req.body.hiRequest.sessionStatus;
    const requestId = req.body.response.requestId;
    Write2file('transactionId', transactionId);
    Write2file('sessionStatus', sessionStatus);
    Write2file('requestId', requestId);
    console.log('callback for health-information on-request received');
    console.log("error in health-information on-request callback ", JSON.stringify(req.body.error, null, 2))
    res.status(202).send('Acknowledged');
});
//---------------- Consent Flow (end) ------------------

//---------------- Subscription Flow (start) ------------------
router.post('/api/v3/hiu/hiecm/subscription-requests/on-init', (req, res) => {
    const subscriptionId = req.body.subscriptionRequest.id;
    const requestId = req.body.response.requestId;
    Write2file('subscriptionId', subscriptionId);
    Write2file('requestId', requestId);
    console.log("callback url upon subs requ init received")
    res.status(202).send('Acknowledged');
});

router.post('/api/v3/hiu/subscription-requests/hiu/notify', (req, res) => {
    const subscriptionRequestId = req.body.notification.subscriptionRequestId;
    const subscriptionStatus = req.body.notification.status;
    const approvedSubscriptionId = req.body.notification.subscription.id;
    Write2file('subscriptionId', subscriptionRequestId);
    Write2file('subscriptionStatus', subscriptionStatus);
    Write2file('approvedSubscriptionId', approvedSubscriptionId);
    console.log("callback url for subs request notify received");
    res.status(200).json(req.body);
    // res.status(202).send('Acknowledged');
});

router.post('/api/v3/hiu/subscription/notify', (req, res) => {
    const eventId = req.body.event.id;
    Write2file('eventId', eventId);
    console.log('subs notification by HIECM for new link record received!');
    res.status(202).send('Acknowledged');
});
//---------------- Subscription Flow (end) ------------------

module.exports = router