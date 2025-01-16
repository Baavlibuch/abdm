const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { readfile } = require('../../read_or_write2KeyValues.js');

//const newToken = readfile('X-Token');

async function abhaCard(req, res) {
	try{
		const xToken = readfile('X-Token');
		console.log('X-TOken in abhaCard:', xToken);
		const guid = readfile('guid');
		const accessToken = readfile('HIP_sessionToken');
		
		const currentTimestamp = new Date();
		const formattedTimestamp = currentTimestamp.toISOString();

		const randomUUID = uuidv4();
		const apiUrl = 'https://abhasbx.abdm.gov.in/abha/api/v3/profile/account/abha-card';
		const authToken = `Bearer ${accessToken}`
		
		const headers = {
			'X-Token': `Bearer ${xToken}`,
			'Authorization': authToken,
			'REQUEST-ID': guid,
			'TIMESTAMP': formattedTimestamp,
			'User-Agent': 'axios/0.19.2',
			'Accept': '*/*',
			'Accept-Encoding': 'gzip, deflate, br',
			'Connection': 'keep-alive',
		};

		const response = await axios.get( apiUrl, { headers } );
		res.status(200).json(response.data);

	} catch (error) {

		console.error('Error in abhaCard.js: ', error.response ? error.response.data : error.message);
	};
};

module.exports = abhaCard;
