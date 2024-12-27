const express = require('express');
const router = express.Router();

const paymentShare = require('../Scan_and_Pay/paymentShare.js');
const paymentOnShare = require('../Scan_and_Pay/paymentOnShare.js');

router.post('/patient-share/payment-share', paymentShare);
router.post('/patient-share/payment-on-share', paymentOnShare);

module.exports = router;

