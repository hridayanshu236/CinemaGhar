import { faAppStore, faFacebook, faGithub, faGooglePlay, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Footer = () => {
    const {isLoggedIn} = useContext(AuthContext);
    return (
        <footer className="w-full flex flex-col justify-between items-center  text-white bg-black py-[15px] border-y border-gray-700">
            <div className="w-full flex justify-between  pl-4">
                <div className="inline-block pl-4">
                    <h1 className="text-xl font-bold mb-2">NAVIGATE</h1>
                    <ul>
                        <li className='my-[5px] mx-[10px] text-lg cursor-pointer'><NavLink
                    to="/"
                    className={({ isActive }) =>
                        `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium hover:bg-white hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${isActive
                            ? "text-purple-500 bg-white sm:bg-transparent"
                            : "text-white"
                        }`
                    }
                >
                    Home
                </NavLink></li>
                        <li className='my-[5px] mx-[10px] text-lg cursor-pointer'> <NavLink
                    to="/movies"
                    className={({ isActive }) =>
                        `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium hover:bg-white hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${isActive
                            ? "text-purple-500 bg-white sm:bg-transparent"
                            : "text-white"
                        }`
                    }
                >
                    Movies
                </NavLink></li>
                        <li className='my-[5px] mx-[10px] text-lg cursor-pointer'><NavLink
                    to="/rates"
                    className={({ isActive }) =>
                        `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium hover:bg-white sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${isActive
                            ? "text-purple-500 bg-white sm:bg-transparent"
                            : "text-white"
                        }`
                    }
                >
                    Rates
                </NavLink></li>
                {!isLoggedIn ? (
                        <li className='my-[5px] mx-[10px] text-lg cursor-pointer'><NavLink
                    to="/login"
                    className={({ isActive }) =>
                        `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium hover:bg-white hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${isActive
                            ? "text-purple-500 bg-white sm:bg-transparent"
                            : "text-white"
                        }`
                    }
                >
                    Login
                </NavLink></li>
                ):''}
                        <li className='my-[5px] mx-[10px] text-lg cursor-pointer'> <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium hover:bg-white hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${isActive
                            ? "text-purple-500 bg-white sm:bg-transparent"
                            : "text-white"
                        }`
                    }
                >
                    About
                </NavLink></li>
                    </ul>
                </div>
                <div className="inline-block">
                    <h1 className="text-xl font-bold mb-2">FOLLOW US ON</h1>
                    <ul>
                        <li className='my-[5px] pt-3 mx-[10px] text-5xl cursor-pointer inline-block transform transition-transform duration-300 hover:scale-125 hover:text-blue-500'><a href='https://www.facebook.com/Hridayanshu23/' target="_blank"><FontAwesomeIcon icon={faFacebook}/> </a></li>
                        <li className='my-[5px] pt-3 mx-[10px] text-5xl cursor-pointer inline-block transform transition-transform duration-300 hover:scale-125 hover:text-[#34A853]'><a href='https://www.instagram.com/hridayanshu_acharya/' target='_blank'><FontAwesomeIcon icon={faInstagram}/></a></li>
                        <li className='my-[5px] pt-3 mx-[10px] text-5xl cursor-pointer inline-block transform transition-transform duration-300 hover:scale-125 hover:text-white'><a href='https://github.com/hridayanshu236' target='_blank'><FontAwesomeIcon icon={faGithub}/></a></li>
                    </ul>
                </div>
                <div className="inline-block pr-4">
                    <h1 className="text-xl font-bold mb-2">Download our App</h1>
                    <ul>
                    <li className='my-[5px] pt-3 mx-[10px] text-5xl cursor-pointer inline-block transform transition-transform duration-300 hover:scale-125 hover:text-blue-500'><FontAwesomeIcon icon={faAppStore}/> </li>
                    <li className='my-[5px] pt-3 mx-[10px] pl-3 text-5xl cursor-pointer inline-block transform transition-transform duration-300 hover:scale-125 hover:text-white'><FontAwesomeIcon icon={faGooglePlay}/> </li>
                        
                    </ul>
                </div>
            </div>
            <div className='w-full flex justify-between items-center px-4 py-2
            '>
                <ul>
                    <li className='inline-block'>&copy; 2024 CinemaGhar. All rights reserved.</li>
                </ul>
                <ul className='flex'>
                    <li className='inline-block ml-4 cursor-pointer'> <NavLink to='/privacypolicy'>Privacy Policy</NavLink></li>
                    <li className='inline-block ml-4 cursor-pointer'><NavLink to='/termsandconditions'>Terms & Conditions</NavLink></li>
                </ul>
            </div>

        </footer>
    );
}

export default Footer;
