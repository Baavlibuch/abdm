const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { readfile, Write2file } = require('./read_or_write2KeyValues.js');

async function enrolAadhaar_v3(req, res) {
	try{
		const accessToken = readfile('HIP_sessionToken');
		const transactionId = readfile('transactionId');
		const currentTimestamp = new Date();
		const formattedTimestamp = currentTimestamp.toISOString();
		const date = currentTimestamp.toISOString().split('T')[0];
		const time = currentTimestamp.toTimeString().split(' ')[0];
		const simpleTimestamp = `${date} ${time}`

		//extract encrypted otpValue from the request body
		const { encodedOtp, mobileNumber } = req.body;

		if (!encodedOtp && !mobileNumber) {
			return res.status(400).json({ error: 'Otp is required'});
		};

		const randomUUID = uuidv4();
		const apiUrl = 'https://abhasbx.abdm.gov.in/abha/api/v3/enrollment/enrol/byAadhaar'
		const authToken = `Bearer ${accessToken}`

		const headers = {
			'Authorization': authToken,
			'Content-Type': 'application/json',
			'User-Agent': 'axios/0.19.2',
			'Accept': '*/*',
			'Accepted-Encoding': 'gzip, deflate, br',
			'Connection': 'keep-alive',
			'REQUEST-ID': randomUUID,
			'TIMESTAMP': formattedTimestamp,
		};

		const requestBody = {
			"authData": {
				"authMethods":[
					"otp"
				],
				"otp": {
					"timeStamp": simpleTimestamp, 
					"txnId" : transactionId,
					"otpValue" : encodedOtp,
					"mobile": mobileNumber,
				}
			},
			"consent": {
				"code":"abha-enrollment",
				"version": "1.4"
			}
		};

		const response = await axios.post(apiUrl, requestBody, { headers });
		Write2file('X-Token', response.data.tokens.token);
		res.status(200).json(response.data);
		//return response.data;

	} catch (error) {
		console.log(error.response ? error.response.data : error.message);
		throw error;
	};
};

module.exports = enrolAadhaar_v3;

