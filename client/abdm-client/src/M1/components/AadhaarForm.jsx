import React, { useState } from 'react'
import forge from 'node-forge';
import axios from 'axios';
import axiosInstance from '../axiosInterceptor';
// import { ApiAccess } from '../context/ApiContext';
import { validate } from '../utils/Verhoeff';
import {encryptText} from "../utils/V3ApiEncryption";

const AadhaarForm = ({ nextForm, setAadhaarMessage }) => {
    const [aadhaar, setAadhaar] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiData, setApiData] = useState([]);

    // const { accessToken } = ApiAccess();
    // console.log(accessToken)

    const handleInputChange = (event) => {

        const value = event.target.value;

        if (/^\d{0,12}$/.test(value)) {
            setAadhaar(value);
            setError('');
            setIsValid(validate(aadhaar.trim()));
        } else {
            setError('Aadhaar number must be 12 digits.');
        }
    };

    const handleBlur = () => {
        if (aadhaar.length !== 12) {
            setError('Aadhaar number must be exactly 12 digits.');
        } else {
            setError('');
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validate(aadhaar.trim())) {
            setError('Invalid Aadhaar Number');
            return;
        }

        setLoading(true);

        try {
            const requestBody = {
                encodedAadhaar: encryptText(aadhaar)
            };

            // const apiUrl = import.meta.env.VITE_AADHAAR_API;

            const response = await axiosInstance.post('/aadhaarV3', requestBody, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // console.log("Aadhaar form API data", response.data);
            setApiData(response.data);
            setAadhaarMessage(response.data);
            nextForm()

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8 border-2 pb-20 py-8 px-16 rounded-lg  shadow-lg shadow-[#d5c8f2] w-2/5 min-w-80 '>
                <div className='flex flex-col'>
                    <h1 className='text-xl font-semibold mb-6'>Aadhaar Number</h1>
                    <input
                        type="text"
                        id='aadhaar'
                        value={aadhaar}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        maxLength="12"
                        placeholder="Enter Aadhaar Number"
                        className='border-2 py-3 px-2 rounded-lg outline-2 outline-[#7F56D9] border-violet-200'
                    />
                    {error &&
                        <span className='text-sm pt-1' style={{ color: 'red' }}>{error}</span>}
                </div>

                {error || aadhaar.length === 0 ? (
                    <button
                        type="submit"
                        disabled
                        className='bg-[#7F56D9] text-white w-full px-5 py-2 text-lg rounded-lg'
                    >
                        Submit
                    </button>
                ) : (
                    <button
                        type="submit"
                        className='bg-[#7F56D9] text-white w-full px-5 py-2 text-lg rounded-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] cursor-pointer relative'
                        disabled={loading}
                    >
                        {loading ? (
                            <div className=" inset-0 flex justify-center items-center px-5">
                                <span className="loading loading-dots loading-[40px]"></span>
                            </div>
                        ) : (
                            'Submit'
                        )}
                    </button>
                )}
            </form>
        </div>
    )
}

export default AadhaarForm
