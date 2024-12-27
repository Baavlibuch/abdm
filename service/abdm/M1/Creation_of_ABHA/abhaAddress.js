const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { readfile } = require('../../read_or_write2KeyValues.js');


async function abhaAddress(req, res) {
	try{
		const accessToken = readfile('HIP_sessionToken');
		const transactionId = readfile('transactionId');

		const randomUUID = uuidv4();
		const currentTimestamp = new Date();
		const formattedTimestamp = currentTimestamp.toISOString();

		const apiUrl = 'https://abhasbx.abdm.gov.in/abha/api/v3/enrollment/enrol/abha-address';
		const authToken = `Bearer ${accessToken}`;

		const headers = {
			'User-Agent': 'axios/0.19.2',
			'Content-Type': 'application/json',
			'Accept': '*/*',
			'Accept-Encoding': 'gzip, deflate, br',
			'REQUEST-ID': randomUUID,
			'TIMESTAMP': formattedTimestamp,
			'Authorization': authToken,
		};

		const { abhaAddress } = req.body;

		if (!abhaAddress) {
			console.log('Abha Address is requires');
		};

		const requestBody = {
			"abhaAddress": abhaAddress,
			"preferred" : 1,
			"txnId": transactionId,
		};

		const response = await axios.post( apiUrl, requestBody, { headers } );
		res.status(200).json(response.data);

	} catch(error) {
		console.error('Error in abhaAddress.js: ', error.response ? error.response.data : error.message);
	}
};

module.exports = abhaAddress;

