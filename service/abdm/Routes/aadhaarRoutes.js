const express = require('express');
const router = express.Router();

const postAadhaar_v3 = require('../aadhar_v3.js');
const enrolAadhaar_v3 = require('../enrolByAadhaar_v3.js');
const updateMobile_v3 = require('../mobileUpdate_v3.js');
const verifyMobile_v3 = require('../mobileVerify_v3.js');
const emailVerification = require('../emailVerification.js');

/*router.get('/aadhaarV3', async (req, res) => {
	try {
		const data = await postAadhaar_v3();
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: error.message});
	}
}); */

/* router.post('/enrolAadhaarV3', async (req, res) => {
	try {
		const data = await enrolAadhaar_v3();
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });	
	}
}); */

router.post('/aadhaarV3', async (req, res) => {
	try {
		await postAadhaar_v3(req, res);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post('/enrolAadhaarV3', enrolAadhaar_v3);

router.post('/mobile/update', updateMobile_v3);

router.post('/mobile/verify', verifyMobile_v3);

router.post('/email/verify', emailVerification);

module.exports = router;
