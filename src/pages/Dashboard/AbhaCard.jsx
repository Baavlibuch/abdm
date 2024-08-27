import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AbhaCard = () => {
    const [loading, setLoading] = useState(false);
    const [profileData, setProfileData] = useState([]);

    const DownloadAbhaCard = async () => {
        try {
            const apiUrl = import.meta.env.VITE_ABHACARD_API;
            const response = await axios.get(apiUrl, {
                responseType: 'blob'
            });

            const blob = new Blob([response.data], { type: 'image/png' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'AbhaCard.png');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
    
        } catch (error) {
            console.log('Error downloading the file:', error);
        }
    };

    
    useEffect(() => {
        const AbhaProfileApi = async () => {
            setLoading(true);
            try {
                const apiUrl = import.meta.env.VITE_PROFILE_API;

                const response = await axios.get(apiUrl, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                setProfileData(response.data);

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        AbhaProfileApi()
    }, [])

    // console.log('ABHA CArd: ', profileData);

    return (
        <>
            {[profileData].map((item, index) => (
                <div key={index}>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-2xl font-medium'>Welcome, {item.name}</h1>

                        <button className='flex items-center gap-2 hover:underline' onClick={DownloadAbhaCard}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.7" stroke="#5b21b6" className="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            <p className='text-violet-800'>Download ABHA Card</p>
                        </button>
                    </div>

                    <div className='bg-[#7F56D9] mt-8 py-5 text-center rounded-md'>
                        <p className='text-2xl text-white'>Ayushman Bharat Health Account (ABHA)</p>
                    </div>

                    {/* card front side */}
                    <div className='p-10 bg-[#fafaf8] mt-2 rounded-md shadow-md'>
                        <div className='flex justify-between'>
                            <img src={`data:image/jpeg;base64,${item.profilePhoto}`} alt="User-image" />

                            <div className='space-y-6'>
                                <div>
                                    <p className='text-right text-sm font-medium text-gray-500'>Name</p>
                                    <p className='text-xl font-semibold py-1 text-right'>{item.name}</p>
                                </div>

                                <div>
                                    <p className='text-right text-sm font-medium text-gray-500'>ABHA number</p>
                                    <p className='text-xl font-semibold py-1 text-right'>{item.ABHANumber}</p>
                                </div>

                                <div>
                                    <p className='text-right text-sm font-medium text-gray-500'>ABHA address</p>
                                    <p className='text-xl font-semibold py-1 text-right'>
                                        {item.preferredAbhaAddress}</p>
                                </div>
                            </div>
                        </div>

                        <div className='pt-16 flex justify-between'>
                            <div>
                                <p className=' text-sm font-medium text-gray-500'>Gender</p>
                                <p className='text-xl font-semibold py-1'>{item.gender}</p>
                                {/* <p className='text-xl font-semibold py-1'>{item.gender}/{item.localizedDetails?.gender}</p> */}
                            </div>
                            <div>
                                <p className=' text-sm font-medium text-gray-500'>Date of birth</p>
                                <p className='text-xl font-semibold py-1'>{item.dayOfBirth}-{item.monthOfBirth}-{item.yearOfBirth}</p>
                            </div>
                            <div>
                                <p className=' text-sm font-medium text-gray-500'>Mobile</p>
                                <p className='text-xl font-semibold py-1'>{item.mobile}</p>
                            </div>
                        </div>
                    </div>

                    {/* card back side */}
                    <div className='p-10 bg-[#fafaf8] mt-6 rounded-md shadow-md space-y-8'>
                        <div>
                            <p className=' text-sm font-medium text-gray-500'>Address</p>
                            <p className='text-xl font-semibold py-1 '>{item.address}</p>
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                <p className=' text-sm font-medium text-gray-500'>State</p>
                                <p className='text-xl font-semibold py-1 '>{item.stateName}</p>
                            </div>
                            <div>
                                <p className=' text-sm font-medium text-gray-500'>City</p>
                                <p className='text-xl font-semibold py-1 '>{item.townName}</p>
                            </div>
                            <div>
                                <p className=' text-sm font-medium text-gray-500'>Pincode</p>
                                <p className='text-xl font-semibold py-1 '>{item.pincode}</p>
                            </div>
                        </div>

                    </div>
                </div>
            ))}


        </>
    )
}

export default AbhaCard
