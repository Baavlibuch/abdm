import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import AbhaCard from './AbhaCard';
import MobileUpdate from './MobileUpdate';
import VerifyEmail from "./VerifyEmail"

const DashbardHome = () => {

    const [selectedMenu, setSelectedMenu] = useState('ABHA Card');
    const [isExpanded, setIsExpanded] = useState(true);

    // const nav = useNavigate();

    const handleSelectedMenu = (item) => {
        setSelectedMenu(item);
    };

    const MenuOptions = [
        {
            optionName: 'ABHA Card',
            component: AbhaCard
        },
        {
            optionName: 'Verify Phone Number',
            component: MobileUpdate
        },
        {
            optionName: 'Verify E-Mail',
            component: VerifyEmail
        },
    ];

    const SelectedComponent = MenuOptions.find(option => option.optionName === selectedMenu)?.component;

    return (
        <div className='flex'>

            {/* left side menu */}
            {isExpanded ?
                <div className='md:w-[25rem] w-full absolute h-screen md:relative z-50 px-4 pt-8 transition-all duration-300 ease-in-out bg-white'>

                    <div className='flex flex-col gap-8 h-full'>
                        <div className='flex justify-between items-center gap-3'>
                            <h1 className='font-medium text-xl text-blue-700'>My Account</h1>

                            <svg onClick={() => setIsExpanded(!isExpanded)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" className="w-6 h-6 relative cursor-pointer">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </div>

                        <div>
                            <ul className='list-none cursor-pointer space-y-4'>
                                {MenuOptions.map((item, index) => (
                                    <li key={index} onClick={() => handleSelectedMenu(item.optionName)}
                                        className={`flex items-center gap-3 px-3 py-3 rounded-xl hover:transition-all delay-75 ease-in-out ${selectedMenu === item.optionName ? 'text-blue-700' : ''}`}
                                    >
                                        <p className='font-medium text-lg'>{item.optionName}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                :
                <div className='w-10 pl-6 pt-8 transition-all duration-300 ease-in-out'>
                    <svg onClick={() => setIsExpanded(!isExpanded)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" className="w-6 h-6 relative cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
            }

            {/* right side */}
            <div className='py-8 px-12 w-full h-screen overflow-y-auto mx-auto'>
                <div className='max-w-[1250px] mx-auto'>
                {SelectedComponent && <SelectedComponent />}
                </div>
                
            </div>
        </div>
    )
}

export default DashbardHome;
