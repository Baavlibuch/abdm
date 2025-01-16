import React, { useState, useRef } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';
import axiosInstance from '../../axiosInterceptor';
import { encryptText } from '../../utils/V3ApiEncryption';

const MobileUpdate = () => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otpResponse, setOtpResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateConfirm, setUpdateConfirm] = useState([]);

  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputs = useRef([]);

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

  const handleMobileUpdate = async (event) => {
    event.preventDefault();

    setShowOtp(false);
    setLoading(true);

    try {

      const requestBody = {
        encodedMobileNumber: encryptText(phoneNumber)
      }

      const apiUrl = import.meta.env.VITE_UPDATEMOBILE_API;

      const response = await axiosInstance.post(apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);
      setOtpResponse(response.data);
      setShowOtp(true);

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const handleOtpSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const mergedOtp = otp.join('')

    try {
      const requestBody = {
        encodedOtp: encryptText(mergedOtp)
      };

      const apiUrl = import.meta.env.VITE_VERIFYMOBILE_API;

      const response = await axiosInstance.post(apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setUpdateConfirm(response.data)
      alert(response.data.message)
      window.location.reload();

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className='text-2xl font-medium mb-6'>Update Mobile Number</h1>

      {showOtp ?
        <form onSubmit={handleOtpSubmit} className='flex flex-col gap-8 py-8 '>
          <div>
            <h1 className='text-xl font-semibold mb-2'>Confirm OTP</h1>
            {[otpResponse]?.map((message, index) => (
              <p key={index} className='font-medium mt-2'>{message.message}</p>
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

          {otp.length === 0 ? (
            <button
              type="submit"
              disabled
              className='bg-[#7F56D9] text-white w-fit px-5 py-2 text-lg rounded-lg'
            >
              Submit
            </button>
          ) : (
            <button
              type="submit"
              className='bg-[#7F56D9] text-white w-fit px-5 py-2 text-lg rounded-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] cursor-pointer relative'
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
        :
        <form onClick={handleMobileUpdate} className='flex flex-col gap-2'>

          <input
            type="text"
            maxLength={10}
            className='w-full md:w-1/2 mt-8 border border-solid border-[#ccc] rounded-[6px] px-2 py-3 outline-[#7F56D9]'
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setPhoneNumber(value);
              }
            }}
            placeholder="Enter phone number"
          />

          <button className='mt-4 px-4 py-2 w-fit bg-violet-600 text-white rounded-lg'>Submit</button>
        </form>
      }


    </div>
  )
}

export default MobileUpdate
