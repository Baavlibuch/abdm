const express = require('express');
const router = express.Router();

const requestInvokedByHIU = require('../Data_Flow/requestInvokedByHIU.js');
const notify = require('../Data_Flow/notify.js');

router.post('/health-info/request', async (req, res) => {
	try{
		const data = await requestInvokedByHIU(req, res)
	} catch (error) {
		res.status(500).json({error: error.message});
	}
});

router.post('/health-info/notify', async (req, res) => {
	try{
		const data = await notify(req, res)
	} catch(error) {
		res.status(500).json({error: error.message})
	}
});

module.exports = router;

