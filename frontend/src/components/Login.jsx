import React, { useState } from 'react';

import Loginsnap from "../assets/Login.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub, faGoogle} from '@fortawesome/free-brands-svg-icons';
import { NavLink } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-row">
            <div className='w-1/2'>
                <img className="w-full min-h-screen" src={Loginsnap} alt="Book Tickets" />
            </div>
            <div className='w-1/2 flex flex-col justify-evenly items-center'>
                <div className="font-poppins font-bold text-4xl">
                    <h1><span className='text-purple-500'>Lo</span>gin</h1>
                </div>
                <div className="w-full max-w-md p-3">
                    <div className="mb-4">
                        <label htmlFor="email" className="text-gray-700 font-medium pl-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 pb-1 pl-1">Password:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={handleTogglePassword}
                        >
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="text-gray-500 h-[15px] w-[15px] pt-6"
                            />
                        </button>
                    </div>
                    <div>
                        <p className="text-black text-center">
                            Don't have an account?{" "}
                            <NavLink to="/signup" className="font-medium text-purple-500">
                                Sign Up
                            </NavLink>
                        </p>
                    </div>
                    <div className='py-2'>
                        <button
                            id="Login"
                            name="Login"
                            className="w-full py-3 bg-purple-500 text-white font-bold rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            Login
                        </button>
                    </div>
                    <div className="flex justify-center">
                    <ul>
                        <li className='my-[5px] pt-3 mx-[10px] text-5xl cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:text-blue-500 inline-block px-2'><FontAwesomeIcon icon={faFacebook}/> </li>
                        <li className='my-[5px] pt-3 mx-[10px] text-5xl cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:text-black inline-block px-2'><FontAwesomeIcon icon={faGithub}/></li>
                        <li className='my-[5px] pt-3 mx-[10px] text-5xl cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:text-[#34A853] inline-block px-2'><FontAwesomeIcon icon={faGoogle}/></li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
