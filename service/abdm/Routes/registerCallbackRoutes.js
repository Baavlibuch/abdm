const express = require('express');
const router = express.Router();

const register_callback_url = require("../register_callback_url.js");
const getAbhaProfile = require("../getAbhaProfile.js");
const enrolSuggestion = require("../M1/Creation_of_ABHA/enrolSuggestion.js");
const abhaCard = require('../M1/Creation_of_ABHA/abhaCard.js');
const abhaAddress = require('../M1/Creation_of_ABHA/abhaAddress.js');
const getAccessToken = require('../getAccessToken.js');

router.get('/bridges/register', async(req, res)=> {
	try{
		const data = await register_callback_url();
		res.json(data)
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get('/abha/profile', async(req,res) => {
	try{
		await getAbhaProfile(req, res);
		//res.json(data)
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//router.get('/abha/enrol/suggestion', enrolSuggestion);

router.get('/abha/enrol/suggestion', async(req,res) => {
	try{
		await enrolSuggestion(req, res);
		//res.json(data);
	} catch(error) {
		res.status(500).json({error: error.message});
	}
});

//router.get('/abha-card', abhaCard);
router.get('/abha-card', async(req, res) => {
	try{
		await abhaCard(req, res)
	} catch(error){
		res.status(500).json({ error: error.message });
	}
})

router.get('/abha/getToken', async(req, res) => {
	try{
		await getAccessToken(req, res);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post('/abha-address', abhaAddress);

module.exports = router;
