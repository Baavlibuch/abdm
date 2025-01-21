const { readfile, Write2file } = require('./read_or_write2KeyValues.js')

const axios = require('axios');
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;
require('dotenv').config();
const postAadhaar_v3 = require('./aadhar_v3.js');

const path = require('path');
const bodyParser = require('body-parser'); // Add body-parser middleware to parse JSON requests
const readLine = require('readline');

// Use bodyParser to parse JSON requests
app.use(bodyParser.json());

const corsOptions = {
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE'
};

app.use(cors(corsOptions));

app.use(express.json());

require("./db/connection.js")

//Call-back post functions
//===========================================================================================================================================================
const callback_urls = require("./Services/callback_urls.js")
//app.use('/', callback_urls)
//
// ============================================================================================================================================================

const register_callback = require("./Routes/registerCallbackRoutes.js");
//app.use('/', register_callback);

const aadhaarRoute = require('./Routes/aadhaarRoutes.js');

const m2Callbacks = require('./M2/Routes/callbackM2Routes.js');
const m2GatewayRoutes = require('./M2/Routes/gatewayRoutes.js');
const m2LinkingRoutes = require('./M2/Routes/HIP_Initiated_Linking_Routes.js');
const m2UserLinkingRoutes = require('./M2/Routes/User_Initiated_Linking.js');
const m2DataFlow = require('./M2/Routes/DataFlow.js');
const m2ProfileShare = require('./M2/Routes/profileShare.js');
const m2RecordShare = require('./M2/Routes/recordShare.js');
const m2PaymentShare = require('./M2/Routes/scanAndPay.js');

const m3Callbacks = require('./M3/Routes/callbackM3Routes.js')
const m3ConsentFlow = require('./M3/Routes/consentFlow.js');
const m3DataFlow = require('./M3/Routes/dataFlow.js');
const m3SubsFlow = require('./M3/Routes/subscriptionFlow.js');

const hprRegistration = require('./HPR/Routes/registration.js');
const saluteRouter = require('./HPR/Routes/salutationRoutes.js');
const ayurvedaRoutes = require('./HPR/Routes/ayurvedaRoutes.js');
const dentistRoutes = require('./HPR/Routes/dentistRoutes.js');
const countryRoutes = require('./HPR/Routes/countryRoutes.js');
const homeopathyRoutes = require('./HPR/Routes/homeopathyRoutes.js');
const languageRoutes = require('./HPR/Routes/languageRoutes.js');
const modernRoutes = require('./HPR/Routes/modernRoutes.js');
const workRoutes = require('./HPR/Routes/workRoutes.js');
const nurseRoutes = require('./HPR/Routes/nurseRoutes.js');
const notWorkingRoutes = require('./HPR/Routes/notWorkingRoutes.js');
const siddhaRoutes = require('./HPR/Routes/siddhaRoutes.js');
const sowaRoutes = require('./HPR/Routes/sowaRoutes.js');
const stateRoutes = require('./HPR/Routes/stateRoutes.js');
const medicineRoutes = require('./HPR/Routes/medicineRoutes.js');
const unaniRoutes = require('./HPR/Routes/unaniRoutes.js');
const workStatusRoutes = require('./HPR/Routes/workStatusRoutes.js');

console.log('client secret: ', process.env.ABDM_SBX_CLIENT_SECRET);

function updateHealthRepoUrl(accessToken, refreshToken, timestamp) {
  return axios.patch(
    'https://dev.abdm.gov.in/devservice/v1/bridges',
    {
      // url: "https://abdm.baavlibuch.com"
      url: "http://34.131.119.20:80"
    },
    {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
}



function addHipToTheBridgeAndEnterRegistry(accessToken, timestamp) {
  return axios.put(
    'https://dev.abdm.gov.in/devservice/v1/bridges/services',
    {
      id: "baavlibuch",
      name: "YourBestHealthAI",
      type: "HIP",
      active: true,
      alias: ["EG"]
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
}


async function getAccessToken() {
  let timestamp = new Date();
  const axios = require('axios');
  const url = 'https://dev.abdm.gov.in/gateway/v0.5/sessions';

  const clientSecret = readfile('clientSecret');
  const requestData = {
    'clientId': 'SBX_002928',
    'clientSecret': '5b24ab9e-2194-4f5f-aca3-fdb0a4872312'
  };

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'User-Agent': 'axios/0.19.2',
    'Content-Length': 80,
    'Accept': 'application/json, text/plain, */*'
  };

  return axios
    .post(url, requestData, { headers })
    .then((response) => {
      console.log("Gateway Auth axios.then. time = ", new Date() - timestamp)
      let { accessToken, expiresIn, refreshExpiresIn, refreshToken, tokenType } = response.data;
      console.log("Authorized clientID and ClientSecret Key");
      Write2file('HIP_sessionToken', accessToken);
      //console.log('Access token received in app.js', accessToken);
      return updateHealthRepoUrl(accessToken, refreshToken, timestamp)
        .then(() => {
          console.log("--------> updateHealthRepoUrl")
          return addHipToTheBridgeAndEnterRegistry(accessToken, timestamp)
            .then((addHipResponse) => {
              console.log('\n');
              console.log('Suceesfully Registered as Health Information Provider(HIP)');
              console.log("Configurations of the Response  from addHipToTheBridgeAndEnterRegistry:");
              console.log('Status addHipToTheBridgeAndEnterRegistry------>  ', addHipResponse.status); // Print the response data
            });
        });

    })
    .catch((error) => {
      console.error('Gateway Auth axios.fetch error caught: ', error);
    });
}


const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});


async function App() {
  try {
    // await getAccessToken();	

    // Start the server
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}....`);
    });

    app.use('/', aadhaarRoute);

    app.use('/', register_callback);

    app.use('/', m2Callbacks);
    app.use('/', m2GatewayRoutes);
    app.use('/', m2LinkingRoutes);
    app.use('/', m2UserLinkingRoutes);
    app.use('/', m2DataFlow);
    app.use('/', m2ProfileShare);
    app.use('/', m2RecordShare);
    app.use('/', m2PaymentShare);

    app.use('/', m3Callbacks);
    app.use('/', m3ConsentFlow);
    app.use('/', m3DataFlow);
    app.use('/', m3SubsFlow);

    app.use('/', hprRegistration);
    app.use('/', saluteRouter);
    app.use('/ayurveda', ayurvedaRoutes);
    app.use('/dentist', dentistRoutes);
    app.use('/', countryRoutes);
    app.use('/homeopathy', homeopathyRoutes);
    app.use('/', languageRoutes);
    app.use('/modern', modernRoutes);
    app.use('/', workRoutes);
    app.use('/nurse', nurseRoutes);
    app.use('/', notWorkingRoutes);
    app.use('/siddha', siddhaRoutes);
    app.use('/sowa', sowaRoutes);
    app.use('/', stateRoutes);
    app.use('/', medicineRoutes);
    app.use('/unani', unaniRoutes);
    app.use('/', workStatusRoutes);

    // Ensure register_callback_url is executed and responds first
    //const register_callback_url = require(path.join(__dirname, './register_callback_url.js'));
    //await register_callback_url();
    //console.log("Callback URL successfullt created!");

    // const abha = readfile('abhaAddress')
    //  const abha = await fs.readFileSync("abha.txt", "utf-8").trim();
    //  console.log(abha);

    //    const { fetch_modes } = require(path.join(__dirname, './ABHA/verification/BY_OTP/fetch_modes.js'));
    //    await fetch_modes(abha); 

    //  const { HIP_auth_init_mobileOtp } = require(path.join(__dirname, './ABHA/verification/BY_OTP/HIP_auth_init_mobileOtp.js'));
    //   await  HIP_auth_init_mobileOtp(abha); 


    //   const { HIP_auth_confirm } = require(path.join(__dirname, './ABHA/verification/BY_OTP/HIP_auth_confirm.js'));

    //   const userOTP = await new Promise((resolve) => {
    //         rl.question("Enter OTP to continue the further process: ", (OTP) => {
    //           resolve(OTP);
    //         });
    //       });
    //   const parsedOTP = String(userOTP);
    //   const transaction_Id_after_HIP_auth_init_mobileOtp = await fs.readFileSync("transaction_Id_after_HIP_auth_init_mobileOtp.txt", "utf-8").trim();
    //   // Pass the transactionId to HIP_auth_confirm
    //   HIP_auth_confirm(transaction_Id_after_HIP_auth_init_mobileOtp, parsedOTP);
    //   rl.close();

    //const { HIP_Initiated_Linking } = require('./M2/HIP/HIP Initated linking/HIP_Initiated_Linking.js');
    //await HIP_Initiated_Linking();

    //const { Notify2Patient_mobile } = require("./M2/HIP/Notification2Mobile/Notifyi2Patient_Mobile.js")
    //await Notify2Patient_mobile()

  } catch (error) {
    console.error('Error in App():', error);
  }
}

App();
