import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axiosInstance from '../axiosInterceptor';
import { useNavigate } from 'react-router-dom';

const AbhaCreationForm = () => {

    const [loading, setLoading] = useState(false);
    const [enrolData, setEnrolData] = useState([]);
    const [selectedUsername, setSelectedUsername] = useState('');
    const nav = useNavigate()

    const handleUsernameClick = (username) => {
        setSelectedUsername(username);
    };

    useEffect(() => {
        const EnrolSuggestApi = async () => {
            setLoading(true);
            try {
                const apiUrl = import.meta.env.VITE_ENROLSUGGEST_API;

                const response = await axiosInstance.get(apiUrl, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const formattedData = response.data.abhaAddressList.map((username) => ({
                    username,
                }));
                setEnrolData(formattedData);

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        EnrolSuggestApi()
    }, [])

    const CreateAbhaAddress = async (event) => {

        event.preventDefault();

        try {
            const requestBody = {
                abhaAddress: selectedUsername
            };

            const apiUrl = import.meta.env.VITE_CREATEADDRESS_API;

            await axiosInstance.post(apiUrl, requestBody, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            nav('/dashboard')

        } catch (error) {
            console.log(error)
        }
    }

    // console.log("username: ", selectedUsername)

    return (
        <div className='flex justify-center items-center'>
            <form onSubmit={CreateAbhaAddress} className='flex flex-col gap-8 border-2  py-8 px-16 rounded-lg  shadow-lg shadow-[#d5c8f2] w-2/5 min-w-80 overflow-x-hidden'>
                <div className='mb-2'>
                    <h1 className='text-xl font-semibold mb-6'>Select ABHA Address</h1>
                    <div className='w-full'>
                        <input
                            type="text"
                            id="username"
                            value={selectedUsername}
                            readOnly
                            placeholder="Click a username below"
                            className='w-full border-2 mb-2 py-3 px-2 rounded-lg outline-2 outline-[#7F56D9] border-violet-200'
                        />

                        <div className='flex gap-x-2 overflow-scroll'>
                            {loading ? (
                                <p className='loading loading-dots text-violet-600'></p>
                            ) : (
                                enrolData.map((usernameData, index) => (
                                    <div
                                        key={index}
                                        className={`hover:text-violet-700 cursor-pointer ${selectedUsername === usernameData.username ? 'text-violet-700' : ''}`}
                                        onClick={() => handleUsernameClick(usernameData.username)}
                                    >
                                        {usernameData.username}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {selectedUsername.length === 0 ? (
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

export default AbhaCreationForm
