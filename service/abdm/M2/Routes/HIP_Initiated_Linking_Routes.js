const express = require('express');
const router = express.Router();

const linkToken = require('../HIP/HIP_Initiated_Linking/linkToken.js');
const callbackLinkToken = require('../HIP/HIP_Initiated_Linking/callbackLinkToken.js');
const careContext = require('../HIP/HIP_Initiated_Linking/careContext.js');
<<<<<<< HEAD
// const callbackCareContext = require('../HIP/HIP_Initiated_Linking/callbackCareContext.js');
=======
const callbackCareContext = require('../HIP/HIP_Initiated_Linking/callbackCareContext.js');
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
const smsNotify = require('../HIP/HIP_Initiated_Linking/smsNotify.js');
const allPatientsLinks = require('../HIP/HIP_Initiated_Linking/allPatientsLinks.js');
const notifyContextUpdate = require('../HIP/HIP_Initiated_Linking/notifyContextUpdate.js');

router.get('/hip/linking/linkToken', async(req, res) => {
	try{
		const data = await linkToken(req, res)
	} catch (error) {
		res.status(500).json({error: error.message})
	}
});

/*
router.post('/callback/hip/linking/linkToken', async(req, res) => {
    try {
        const data = await callbackLinkToken(req, res);
        console.log('router callbackLinkToken data', data);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}); 
*/

<<<<<<< HEAD
// router.get('/api/v3/hip/token/on-generate-token', async (req, res) => {
// 	try{
// 		const data = await callbackLinkToken(req, res)
// 		res.status(200).send(data)
// 	} catch (err) {
// 		console.log(err)
// 	}
// })
=======
router.get('/api/v3/hip/token/on-generate-token', async (req, res) => {
	try{
		const data = await callbackLinkToken(req, res)
		res.status(200).send(data)
	} catch (err) {
		console.log(err)
	}
})
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6

/*
router.post('/api/v3/hip/token/on-generate-token', async (req, res) => {
	const callbackData = await req.body;
	console.log('callback from M2 linkToken', callbackData);

	res.status(200).json(res.data);
});
*/


<<<<<<< HEAD
// router.get('/link/careContext', async(req, res) => {
// 	try{
// 		const data = await careContext(req, res);
// 	} catch (error) {
// 		res.status(500).json({ error:error.message })
// 	}
// });

router.post('/link/careContext', careContext);

// router.get('/callback/link/careContext', async (req, res) => {
// 	try{
// 		const data = await callbackCareContext(req, res);
// 	} catch (error) {
// 		res.status(500).json({error: error.message});
// 	}
// })

router.post('/allpatients', allPatientsLinks);

router.post('/link/sms/notify', smsNotify);

=======
router.get('/link/careContext', async(req, res) => {
	try{
		const data = await careContext(req, res);
	} catch (error) {
		res.status(500).json({ error:error.message })
	}
});

router.get('/callback/link/careContext', async (req, res) => {
	try{
		const data = await callbackCareContext(req, res);
	} catch (error) {
		res.status(500).json({error: error.message});
	}
})

router.post('/link/sms/notify', smsNotify);

router.post('/allpatients', allPatientsLinks);

>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
router.post('/context/update/notify', notifyContextUpdate);

module.exports = router;
