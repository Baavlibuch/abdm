import React, { useState } from 'react'
import AadhaarForm from '../components/AadhaarForm';
import ProgressBar from "../components/ProgressBar";
import AadhaarOtp from '../components/AadhaarOtp';
import AbhaCreationForm from '../components/AbhaCreationForm';

const Home = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [aadhaarMessage, setAadhaarMessage] = useState([])

    const handleNextAadhaarForm = () => {
        setCurrentStep((currentStep) => currentStep + 1);
    };

    const handleNextAadhaarOtp = (data) => {
        setCurrentStep((currentStep) => currentStep + 1);
    }

    const FormDisplay = () => {
        if (currentStep === 0) {
            return <AadhaarForm currentStep={currentStep} setCurrentStep={setCurrentStep} nextForm={handleNextAadhaarForm} setAadhaarMessage={setAadhaarMessage}/>
        } else if (currentStep === 1) {
            return <AadhaarOtp currentStep={currentStep} setCurrentStep={setCurrentStep} aadhaarMessage={aadhaarMessage} nextForm={handleNextAadhaarOtp} />
        } else if (currentStep === 2) {
            return <AbhaCreationForm />
        }
    };

    console.log('client secret: ', process.env.ABDM_SBX_CLIENT_ID);

    return (
        <div>
            <div className='flex gap-4 items-center justify-center text-[#667085] py-12'>
                {<ProgressBar currentStep={currentStep} />}
            </div>

            {FormDisplay()}
        </div>
    )
}

export default Home
