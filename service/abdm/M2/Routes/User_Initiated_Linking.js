const express = require('express');
const router = express.Router();

const patientContextDiscover = require('../Patient/User_Initiated_Linking/patientContextDiscover.js');
const HMISresponse = require('../Patient/User_Initiated_Linking/HMISresponse.js');
const recordLinkInit = require('../Patient/User_Initiated_Linking/recordLinkInit.js');
const HMISresponseOnRecordLink = require('../Patient/User_Initiated_Linking/HMISresponseOnRecordLink.js');
const CareContextConfirm = require('../Patient/User_Initiated_Linking/careContextConfirm.js');
const ResponseOnRecordConfirm = require('../Patient/User_Initiated_Linking/responseOnRecordConfirm.js');

router.post('/patient/context/discover', patientContextDiscover);

router.post('/hmis/context/discover/response', HMISresponse);

router.post('/patient/record/link/init', recordLinkInit);

// router.post('/patient/response/record/link', async (req, res) => {
// 	try{
// 		const data = await HMISresponseOnRecordLink(req, res)
// 	} catch (err) {
// 		res.status(500).json({err: err.message});
// 	}
// });

router.get('/patient/response/record/link', HMISresponseOnRecordLink);

router.post('/care-context/confirm', async (req, res) => {
	try{
		const data = await CareContextConfirm(req, res)
	} catch (err) {
		res.status(500).json({err: err.message});
	}
});

router.post('/response/on-confirm', async (req, res) => {
	try{
		const data = await ResponseOnRecordConfirm(req, res)
	} catch (err) {
		res.status(500).json({err: err.message});
	}
});

module.exports = router;
