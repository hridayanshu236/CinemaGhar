import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/logo3.svg';
import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='w-full flex justify-between items-center font-poppins text-white bg-black py-[15px] px-4 border-y border-gray-700'>
            <div className='flex-grow'>
                <img className='w-[100px] h-[80px] cursor-pointer' src={logo} alt="Logo" />
            </div>
            <ul className=''>
                <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                    <NavLink
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
                <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                    <NavLink
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
                <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                    <NavLink
                    to="/rates"
                    className={({ isActive }) =>
                        `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium hover:bg-white hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${isActive
                            ? "text-purple-500 bg-white sm:bg-transparent"
                            : "text-white"
                        }`
                    }
                >
                    Rates
                </NavLink></li>
                <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                    <NavLink
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
                <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                    <NavLink
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
            <div className='inline-block px-3 border rounded-xl'>
                <FontAwesomeIcon className='px-1' icon={faSearch} />
                <input className='p-1 border-0 outline-none bg-transparent rounded-sm' type="text" placeholder="Search" />
            </div>
        </nav>
    );
}

export default Navbar;
