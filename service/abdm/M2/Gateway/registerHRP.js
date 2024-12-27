const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');

async function registerHRP (req, res) {
	try{
                const clientSecret = readfile('clientSecret');
                const clientId = readfile('clientId');
		const M2_AccessToken = readfile('M2_AccessToken');

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const randomUUID = uuidv4();
                const apiUrl = 'https://facilitysbx.abdm.gov.in/v1/bridges/MutipleHRPAddUpdateServices';

		const { facilityId, facilityName, hipName, type } = req.body;

                const headers = {
			'Authorization': `Bearer ${M2_AccessToken}`,
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'X-CM-ID': 'sbx'
                };

                const requestBody = {
			'facilityId': facilityId,
			'facilityName': facilityName,
			'HRP': [
				{
                        		'bridgeId': 'SBX_002928',
					'hipName': hipName,
					'type': type,
					'active': true
				}
			]
                };

                const response = await axios.post( apiUrl, requestBody, { headers } );
                res.status(200).json(response.data);


        } catch (error) {
                console.error("Error in registerHRP.js: ", error.response ? error.response.data : error.message);
        }

};

module.exports = registerHRP;
