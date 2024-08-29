import React, {useContext, useState } from 'react';

import Loginsnap from "../assets/Login.jpg";
import login from '../assets/login1.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';


const Login = () => {
    const { checkLoginStatus } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const [formInput, setFormInput] = useState({
        email: "",
        password: "",
        successMsg: "",
    });

    const [formError, setFormError] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate(); // Initialize navigate
    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setFormInput({
            ...formInput,
            [name]: value,
        });
    };

    // const validateFormInput = (event) => {
    //   event.preventDefault();

    // Initialize an object to track input errors


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        let inputError = {
            email: "",
            password: "",
        };

        // Check if email and password are empty
        if (!formInput.email && !formInput.password) {
            setFormError({
                ...inputError,
                email: "Enter a valid email address",
                password: "Password should not be empty",
            });
            return;
        }

        // Check if email is empty
        if (!formInput.email) {
            setFormError({
                ...inputError,
                email: "Enter a valid email address",
            });
            return;
        }

        //   // Check if password and confirm password match
        //   if (formInput.confirmPassword !== formInput.password) {
        //     setFormError({
        //       ...inputError,
        //       confirmPassword: "Password and confirm password should be the same",
        //     });
        //     return;
        //   }

        // Check if password is empty
        if (!formInput.password) {
            setFormError({
                ...inputError,
                password: "Password should not be empty",
            });
            return;
        }

        // Clear any previous errors and show success
        // setFormError(inputError);
        // setFormInput((prevState) => ({
        //   ...prevState,
        //   successMsg: "Incorrect Password",
        // }));
        try {
            const response = await axios.post('cinema-ghar-api.vercel.app/api/auth/login', {
                email: formInput.email,
                password: formInput.password
            },{
                withCredentials: true
            });

            if (response.data.message === "Success") {
                await checkLoginStatus();
                // Navigate to home page
                navigate('/');
            } else if (response.data.error) {
                // Set error message from server response
                setFormError({
                    ...inputError,
                    successMsg: response.data.error,
                });
            }
        } catch (err) {
            console.error('Error during login:', err);
            setFormError({
                ...inputError,
                successMsg: "An error occurred. Please try again.",
            });
        }
           
    }

    return (
        <div className="flex flex-col md:flex-row flex-wrap">
            <div className='w-full md:w-1/2'>
                <img className="w-full min-h-screen" src={login} alt="Book Tickets" />
            </div>
            <div className='w-full md:w-1/2 flex flex-col justify-evenly items-center pt-5'>
                <div className="font-poppins font-bold text-4xl">
                    <h1><span className='text-purple-500'>Lo</span>gin</h1>
                </div>
                <div className="w-full max-w-md p-3">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="text-gray-700 font-medium pl-1">Email</label>
                            <input
                                value={formInput.email}
                                onChange={handleUserInput}
                                name="email"
                                id="email"
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your email"
                                required
                            />
                            <p className='text-red-700'>{formError.email}</p>
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 pb-1 pl-1">Password:</label>
                            <input
                                value={formInput.password}
                                onChange={handleUserInput}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your password"
                            />
                            <p className='text-red-700'>{formError.password}</p>
                            <p className='text-red-700'>{formError.successMsg}</p>


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
                    </form>
                    <div className="flex justify-center">
                        <ul>
                            <li className='my-[5px] pt-3 mx-[10px] text-5xl cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:text-blue-500 inline-block px-2'><FontAwesomeIcon icon={faFacebook} /> </li>
                            <li className='my-[5px] pt-3 mx-[10px] text-5xl cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:text-black inline-block px-2'><FontAwesomeIcon icon={faGithub} /></li>
                            <li className='my-[5px] pt-3 mx-[10px] text-5xl cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:text-[#34A853] inline-block px-2'><FontAwesomeIcon icon={faGoogle} /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
