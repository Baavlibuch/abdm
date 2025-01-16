const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { readfile, Write2file } = require('../../../read_or_write2KeyValues.js');

async function callbackCareContext(req, res) {
	 try{
                const baseUrl = 'https://webhook.site/252b96ed-5b09-4258-b131-de8668db4d1f'
                const apiUrl = baseUrl + '/api/v3/link/on_carecontext';

                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTime = currentTime.toISOString();

                const M2_AccessToken = readfile('M2_AccessToken');

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTime,
                        'X-HIP-ID': '01082002',
                        'Authorization': `Bearer ${M2_AccessToken}`
                };

		 let statusMessage;

	        const errorResponse = {
        	    error: {
                	code: "ABDM-1056",
                	message: "This care context has been already linked"
            	},
            	response: {
                	requestId: randomUUID
            	}
        	};

        	// Handle different error scenarios
        	if (errorResponse.error) {
            	switch (errorResponse.error.code) {
                	case "ABDM-1056":
                    	statusMessage = "These care contexts have been already linked";
                   	break;
                	// Add other cases here for different error codes
                	default:
                   	 statusMessage = errorResponse.error.message || "An unknown error occurred";
                    	break;
            	}
        	} else {
            		// If no errors, you can assign a success status message
            		statusMessage = "Successfully Linked care context";
       	 	}

                const requestBody = {
                        'abhaAddress': 'gyanangshu_2000@sbx',
                        'status':statusMessage, 
			'response': {
                                'requestId': 'a4b1abe8-8a62-4be2-8be5-a82e3d1e9f5d'
                        }
                };

                const response = await axios.post( apiUrl, requestBody, { headers } );
		let { abhaAddress } = res.body;
		 console.log(abhaAddress)
                res.status(200).json(response.json)

        } catch (error) {
                console.error('Error in callbackCareContext', error.response ? error.response.data : error.message )
        }

};

module.exports = callbackCareContext;
