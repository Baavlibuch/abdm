const express = require('express');
const router = express.Router();

const subsRequest = require('../Subscription_Flow/subsRequest.js');
const requestInit = require('../Subscription_Flow/requestInit.js');
const approveSubsRequest = require('../Subscription_Flow/approveSubsRequest.js');
const onNotify = require('../Subscription_Flow/onNotify.js');
const denyRequest = require('../Subscription_Flow/denyRequest.js');
const editSubscription = require('../Subscription_Flow/editSubscription.js');
const HIUonNotify = require('../Subscription_Flow/HIUonNotify.js');

router.post('/subs-flow/request', async (req, res) => {
<<<<<<< HEAD
	try {
		const data = await subsRequest(req, res)
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post('/subs-flow/init', async (req, res) => {
	try {
		const data = await requestInit(req, res)
	} catch (error) {
		res.status(500).json({ error: error.message });
=======
        try{
                const data = await subsRequest(req, res)
        } catch (error) {
                res.status(500).json({error: error.message});
        }
});

router.post('/subs-flow/init', async(req, res) => {
	try{
		const data = await requestInit(req, res)
	} catch (error) {
		res.status(500).json({error: error.message});
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
	}
});

router.post('/subs-flow/approve', async (req, res) => {
<<<<<<< HEAD
	try {
		const data = await approveSubsRequest(req, res)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
});

// router.post('/subs-flow/on-notify', async(req, res) => {
// 	try{
// 		const data = await onNotify(req, res)
// 	} catch (error) {
// 		res.status(500).json({error: error.message});
// 	}
// });
router.get('/subs-flow/on-notify', onNotify)

// router.get('/subs-flow/deny/request', denyRequest);
router.post('/subs-flow/deny/request', async (req, res) => {
	try {
		const data = await denyRequest(req, res)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

router.post('/subs-flow/edit/subscription', async (req, res) => {
	try {
		const data = await editSubscription(req, res)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
});

router.post('/subs-flow/HIU/on-notify', async (req, res) => {
	try {
		const data = await HIUonNotify(req, res)
	} catch (error) {
		res.status(500).json({ error: error.message })
=======
	try{
		const data = await approveSubsRequest(req, res)
	} catch(error) {
		res.status(500).json({error: error.message})
	}
});

router.post('/subs-flow/on-notify', async(req, res) => {
	try{
		const data = await onNotify(req, res)
	} catch (error) {
		res.status(500).json({error: error.message});
	}
});

router.get('/subs-flow/deny/request', denyRequest);

router.post('/subs-flow/edit/subscription', async (req, res) => {
	try{
		const data = await editSubscription(req, res)
	} catch (error) {
		res.status(500).json({error: error.message})
	}
});

router.post('/subs-flow/HIU/on-notify', async(req, res) => {
	try{
		const data = await HIUonNotify(req, res)
	} catch (error) {
		res.status(500).json({error: error.message})
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
	}
});

module.exports = router;

