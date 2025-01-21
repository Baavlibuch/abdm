const express = require('express');
const router = express.Router();

const authTokenApi = require('../Gateway/authTokenApi.js');
const openIdConfigApi = require('../Gateway/openIdConfigApi.js');
const keycloakCerts = require('../Gateway/keycloakCerts.js');
const updateBridge = require('../Gateway/updateBridge.js');
const registerHRP = require('../Gateway/registerHRP.js');
const findBridgeByServiceId = require('../Gateway/findBridgeByServiceId.js');

router.get('/abha/api/m2/authToken', authTokenApi);
// router.get('/abha/api/m2/authToken', async(req, res) => {
// 	try{
// 		const data = await authTokenApi(req, res);
// 	} catch (error){
// 		res.status(500).json({ error: error.message });
// 	}
// });

router.get('/m2/keycloak/certs', async(req, res) => {
	try{
		const data = await keycloakCerts(req, res)
	} catch (error) {
		res.status(500).json({error: error.message})
	}
});

router.get('/m2/openId', async (req, res) => {
	try {
		const data = await openIdConfigApi(req, res)
	} catch (error) {
		res.status(500).json({error: error.message});
	}
});

router.post('/update/bridge/url', updateBridge);

router.post('/register/multipleHRP', registerHRP);

router.post('/bridge-service/serviceId', findBridgeByServiceId);

module.exports = router;
