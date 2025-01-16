import React, { useState, useRef } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import { encryptText } from "../utils/V3ApiEncryption";
import axios from 'axios';
import axiosInstance from '../axiosInterceptor';
import { useNavigate } from 'react-router-dom';

const AadhaarOtp = ({ aadhaarMessage, nextForm }) => {
    const length = 6;
    const [otp, setOtp] = useState(Array(length).fill(''));
    const inputs = useRef([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const handleChange = (e, index) => {
        const { value } = e.target;

        if (value.match(/^\d$/)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move focus to the next input
            if (index < length - 1) {
                inputs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const newOtp = [...otp];

            // Clear the current input and move focus to the previous input
            if (otp[index] !== '') {
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                newOtp[index - 1] = '';
                setOtp(newOtp);
                inputs.current[index - 1].focus();
            }
        }
    };

    const handleOtpSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        const mergedOtp = otp.join('')

        try {
            const requestBody = {
                encodedOtp: encryptText(mergedOtp),
                mobileNumber: phoneNumber
            };

            const apiUrl = import.meta.env.VITE_AADHAAR_ENROL;

            const response = await axiosInstance.post(apiUrl, requestBody, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // console.log("Aadhaar enrol data", response.data);
            if (response.data.isNew === true) {
                nextForm()
            } else {
                nav('/dashboard')
            }
            // nextForm()
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex justify-center items-center'>
            <form onSubmit={handleOtpSubmit} className='flex flex-col gap-8 border-2 py-8 pb-16 px-10 rounded-lg  shadow-lg shadow-[#d5c8f2] w-2/5 min-w-80 '>
                <div>
                    <h1 className='text-xl font-semibold mb-2'>Confirm OTP</h1>
                    {[aadhaarMessage]?.map((item, index) => (
                        <p key={index} className='text-left font-semibold text-sm'>{item?.message}</p>
                    ))}
                </div>
                <div className='flex items-center space-x-2'>
                    {otp.map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={otp[index]}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputs.current[index] = el)}
                            className='w-10 h-10 text-center text-lg border border-solid border-[#ccc] outline-[#7F56D9] rounded-[4px]'
                        />
                    ))}
                </div>
                <PhoneInput
                    placeholder="Enter phone number"
                    defaultCountry='IN'
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    className='w-full border border-solid border-[#ccc] rounded-[4px] px-2 py-3' />

                {phoneNumber.length === 0 || otp.length === 0 ? (
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

export default AadhaarOtp
