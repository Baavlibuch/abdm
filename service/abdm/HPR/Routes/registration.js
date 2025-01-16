const express = require('express');
const router = express.Router();

const generateOtp = require('../Registeration/genereateOtp.js');
const verifyOtp = require('../Registeration/verifyOtp');
const generateMobileOtp = require('../Registeration/generateMobileOtp.js');
const verifyMobileOtp = require('../Registeration/verifyMobileOtp.js');
const generateHrpId = require('../Registeration/generateHrpId.js');
const registerProfessional = require('../Registeration/registerProfessional');

router.post('/hpr/registration/aadhaar/generateOtp', generateOtp);
router.post('/hpr/registration/aadhaar/verifyOtp', verifyOtp);
router.post('/hpr/registration/aadhaar/mobileOtp', generateMobileOtp);
router.post('/hpr/registration/aadhaar/verifyMobileOtp', verifyMobileOtp);
router.post('hpr/registration/create/hprId', generateHrpId);
router.post('/hpr/registration/new/professional', registerProfessional);

module.exports = router;

