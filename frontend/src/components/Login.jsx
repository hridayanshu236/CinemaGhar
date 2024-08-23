import React, { useState } from 'react';
import Loginsnap from "../assets/Login.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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
                    <h1>Login</h1>
                </div>
                <div className="w-full max-w-md p-3">
                    <div className="mb-4">
                        <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 pb-1">Password:</label>
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
                </div>
            </div>
        </div>
    );
};

export default Login;
