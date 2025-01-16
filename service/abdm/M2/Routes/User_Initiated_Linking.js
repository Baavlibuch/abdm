const express = require('express');
const router = express.Router();

const patientContextDiscover = require('../Patient/User_Initiated_Linking/patientContextDiscover.js');
const HMISresponse = require('../Patient/User_Initiated_Linking/HMISresponse.js');
const recordLinkInit = require('../Patient/User_Initiated_Linking/recordLinkInit.js');
<<<<<<< HEAD
const HMISresponseOnRecordLink = require('../Patient/User_Initiated_Linking/HMISresponseOnRecordLink.js');
const CareContextConfirm = require('../Patient/User_Initiated_Linking/careContextConfirm.js');
const ResponseOnRecordConfirm = require('../Patient/User_Initiated_Linking/responseOnRecordConfirm.js');
=======
const HMISresponseOnRecordLink = ('../Patient/User_Initiated_Linking/HMISresponseOnRecordLink.js');
const careContextConfirm = ('../Patient/User_Initiated_Link/careContextConfirm.js');
const responseOnRecordConfirm = ('../Patient/User_Initiated_Link/responseOnRecordConfirm.js');
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6

router.post('/patient/context/discover', patientContextDiscover);

router.post('/hmis/context/discover/response', HMISresponse);

router.post('/patient/record/link/init', recordLinkInit);

<<<<<<< HEAD
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
=======
router.post('/patient/response/record/link', async (req, res) => {
	try{
		const data = await HMISresponseOnRecordLink(req, res)
	} catch (err) {
		res.status(500).json({err: err.message});
	}
});

router.post('/care-context/confirm', async (req, res) => {
	try{
		const data = await careContextConfirm(req, res)
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
	} catch (err) {
		res.status(500).json({err: err.message});
	}
});

router.post('/response/on-confirm', async (req, res) => {
	try{
<<<<<<< HEAD
		const data = await ResponseOnRecordConfirm(req, res)
=======
		const data = await responseOnRecordConfirm(req, res)
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
	} catch (err) {
		res.status(500).json({err: err.message});
	}
});

module.exports = router;
