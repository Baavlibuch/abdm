import React, { useState } from 'react';
// import axios from 'axios';
import axiosInstance from '../../axiosInterceptor';
import { encryptText } from '../../utils/V3ApiEncryption';

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState([]);

  const handleEmail = async (event) => {
    event.preventDefault();

    try {
      const requestBody = {
        emailId: encryptText(email)
      };

      // const apiUrl = import.meta.env.VITE_VERIFYEMAIL_API;

      const response = await axiosInstance.post('/email/verify', requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setEmailConfirm(response.data);
      console.log(response.data)
      setEmail('');

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-medium'>Update Email</h1>

      {emailConfirm && 
      <div className='mt-8'>
        {[emailConfirm]?.map((item, index) => (
          <p key={index} className='font-medium text-green-500'>{item.message}</p>
        ))}
      </div>
      }

      <form onSubmit={handleEmail} className='flex flex-col mt-10'>
        <input
          type="email"
          className='border-2 py-3 px-2 rounded-lg outline-2 outline-[#7F56D9] border-violet-200 md:w-1/2 w-full'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <button type="submit" className='mt-4 px-4 py-2 w-fit bg-violet-600 text-white rounded-lg'>Submit</button> 
      </form>
    </div>
  );
};

export default VerifyEmail;
