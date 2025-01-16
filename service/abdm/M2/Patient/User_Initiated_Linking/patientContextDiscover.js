const axios = require('axios');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');

async function patientContextDiscover (req, res) {
	try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/user-initiated-linking/v3/patient/care-context/discover';

                const { abhaAddress, hipId } = req.body;

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
                        'X-HIU-ID': hipId,
                        //'X-HIP-ID': 'IN162946244',
                        'X-CM-ID': 'sbx',
                      };

                const requestBody = {
			'hipId': hipId,
			'unverifiedIdentifiers': [
				{
					'type': 'ABHA_ADDRESS',
					'value' : abhaAddress
				}
			]
		};

                const response = await axios.post( apiUrl, requestBody, { headers } );
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in patientContextDiscover.js: ', error.response ? error.response.data : error.message)
                res.status(500).json({error: error.message});
        }

};

module.exports = patientContextDiscover;
