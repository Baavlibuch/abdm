const axios = require('axios');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');

async function linkToken(req, res) {
	try{
		const M2_AccessToken = readfile('M2_AccessToken');
		const baseUrl = readfile('M2_Sandbox_BaseURL');
		const randomUUID = uuidv4();

		const currentTime = new Date();
		const formattedTimestamp = currentTime.toISOString();

		const apiUrl = baseUrl + '/api/hiecm/v3/token/generate-token';

		const headers = {
			'REQUEST-ID': randomUUID,
			'TIMESTAMP': formattedTimestamp,
			'Authorization': `Bearer ${M2_AccessToken}`,
			'X-HIP-ID': '01082002',
			//'X-HIP-ID': 'IN2810014366',
			'X-CM-ID': 'sbx'
		};

		const callbackUrl = 'http://34.131.119.20:3000/api/v3/hip/token/on-generate-token';

		const requestBody = {
			'abhaNumber': '91334718534327',
			'abhaAddress': 'gyanangshu@sbx',
			'name': 'Gyanangshu Misra',
			'gender': 'M',
			'yearOfBirth': '2000',
			'callbackUrl': callbackUrl
		};

		const response = await axios.post( apiUrl, requestBody, { headers } );
		console.log('callback response in linkToken.js: ', response.data)
		res.status(200).json(response.data)

	} catch (error) {
		console.error('error in linkToken: ', error.response ? error.response.data : error.message)
		res.status(500).json({error: error.message});
	}
};

module.exports = linkToken;
