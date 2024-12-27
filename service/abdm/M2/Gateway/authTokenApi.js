const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');

async function authTokenApi(req, res){
	try{
		const baseUrl = readfile('M2_Sandbox_BaseURL');
		const clientSecret = readfile('clientSecret');
		const clientId = readfile('clientId');
		
		const currentTime = new Date();
		const formattedTimestamp = currentTime.toISOString();

		const randomUUID = uuidv4();
		const apiUrl = baseUrl + '/api/hiecm/gateway/v3/sessions';
		
		const headers = {
			'REQUEST-ID': randomUUID,
			'TIMESTAMP': formattedTimestamp,
			'X-CM-ID': 'Sbx'
		};

		const requestBody = {
			'clientId': 'SBX_002928',
			//'clientSecret': '0b19fba7-1232-4a1f-a3dc-981167db1749',
			'clientSecret': clientSecret,
			'grantType': 'client_credentials',
		};

		const response = await axios.post( apiUrl, requestBody, { headers } );
		const { accessToken, refreshToken } = response.data;
		Write2file('M2_AccessToken', accessToken);
		Write2file('M2_refreshToken', refreshToken);
		res.status(200).json(response.data);


	} catch (error) {
		console.error("Error in M2 authTokenAPi.js: ", error.response ? error.response.data : error.message);
	}
};

module.exports = authTokenApi;
	
