const axios = require('axios');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 80;
//const port = 443;
//const port = 3000;
const path = require('path');
const bodyParser = require('body-parser'); // Add body-parser middleware to parse JSON requests

// Use bodyParser to parse JSON requests
app.use(bodyParser.json());


// app.post('http://34.131.119.20:80/v0.5/links/link/on-add-contexts', (req, res) => {
//   console.log('Received on Add Contexts callback:', req.body);
//   res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
// });


// app.post('http://34.131.119.20:80/v0.5/patients/sms/on-notify', (req, res) => {
//   console.log('Acknowledgment response for SMS notification sent to patient by HIP:', req.body);
//   res.status(202).send('Acknowledgment response for SMS notification sent to patient by HIP'); // Respond with 202 status code as acknowledgment
// });

// app.post('http://34.131.119.20:80/v0.5/care-contexts/on-discover', (req, res) => {
//   console.log('Response to patient account discovery request:', req.body);
//   res.status(202).send('Acknowledged patient discover request'); // Respond with 202 status code as acknowledgment
// });

// app.post('http://34.131.119.20:80/v0.5/links/link/on-init', (req, res) => {
//   console.log('Response to patient care context link request', req.body);
//   res.status(202).send('Acknowledged patient care context link request'); // Respond with 202 status code as acknowledgment
// });

// app.post('https://dev.abdm.gov.in/gateway/v0.5/consents/hip/on-notify', (req, res) => {
//   console.log('Response to patient care context link request', req.body);
//   res.status(202).send('Acknowledged patient care context link request'); // Respond with 202 status code as acknowledgment
// });
//============================================================================================================================================================
// 1. Request Health Information
app.post('/v0.5/health-information/hip/request', (req, res) => {
  console.log('Received response for Request Health Information:', req.body);
  console.log(req.body.transactionId);
  const transactionId = req.body?.transactionId;

  fs.writeFileSync("transaction_Id_after_Request_Health_Information", transactionId);
  res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment

});
// 2. Acknowledge Health Information Request receipt
app.post('/v0.5/health-information/hip/on-request', (req, res) => {
  console.log('Received response for Acknowlegement Health Information Request Recipt:', req.body);
  console.log(req.body.transactionId);
  res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment

});

// 3. Data Transfer via Data Push Url
app.post('/v0.5/health-information/transfer', (req, res) => {
  console.log('Received response for Data Transfer via Data Push Url:', req.body);
  console.log(req.body.transactionId);
  res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment

});
//============================================================================================================================================================
async function HIP_App() {
  try {
    // Start the server
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  
    // working
    // const { HIP_Initiated_Linking } = require(path.join(__dirname, './HIP_Initiated_Linking.js'));
    // await HIP_Initiated_Linking();

    // working
    // const { HIP_notification_to_mobile } = require(path.join(__dirname, './HIP_notification_to_mobile.js'));
    // await HIP_notification_to_mobile();

  //   const { HIP_consent_notification } = require(path.join(__dirname, './HIP_consent_notification.js'));
  //   await HIP_consent_notification();

     const { HIP_discover } = require(path.join(__dirname, './HIP_discover.js'));
     await HIP_discover("71585437060845@sbx");

  //  const { HIP_link_confirm } = require(path.join(__dirname, './HIP_link.js'));
 //   await HIP_link_confirm();


    // const { HIP_data_transfer_notification } = require(path.join(__dirname, './HIP_request_health_record'));
    // await HIP_data_transfer_notification(transactionId);


  } catch (error) {
    console.error('Error ', error);
  }
}

HIP_App();

