import React, { useState } from 'react';
import Loginsnap from "../assets/login1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [verificationMsg, setVerificationMsg] = useState("");  // New state for verification message
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let inputError = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Validation
    if (!formInput.email) {
      setFormError({ ...inputError, email: "Enter a valid email address" });
      return;
    }

    if (formInput.confirmPassword !== formInput.password) {
      setFormError({ ...inputError, confirmPassword: "Passwords do not match" });
      return;
    }

    if (!formInput.password) {
      setFormError({ ...inputError, password: "Password should not be empty" });
      return;
    }

    setFormError(inputError); // Clear previous errors

    // Signup API request
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`, {
      email: formInput.email,
      password: formInput.password,
    })
    .then(response => {
      // Notify user to verify their email
      setSuccessMsg("Signup successful! Please check your email to verify your account.");
      setVerificationMsg("Verification email sent to " + formInput.email + ". Check your inbox.");  // New message

      // Clear form inputs
      setFormInput({ email: "", password: "", confirmPassword: "" });

      // Optionally, navigate to a verification page
      // navigate('/email-verification');
    })
    .catch(error => {
      let errorMsg = "An unexpected error occurred. Please try again.";
      if (error.response && error.response.status === 400) {
        errorMsg = error.response.data.error === "Email already in use" ? "Email already in use" : errorMsg;
      }
      setFormError({ ...inputError, email: errorMsg });
    });
  };

  return (
    <div className="flex flex-row flex-wrap justify-center min-h-[100vh] my-auto bg-gradient-to-r from-purple-100 to-slate-100 ">
      {/* <div className='w-full '>
        <img className="w-full min-h-screen" src={Loginsnap} alt="Book Tickets" />
      </div> */}
      <div className="w-full  flex flex-col justify-evenly items-center pt-5">
        <div className="font-poppins font-bold text-4xl">
          <h1>
            <span className="text-purple-500">Re</span>gister
          </h1>
        </div>
        <div className="w-full max-w-md p-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="text-gray-700 font-medium pl-1">
                Email
              </label>
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
              <p className="text-red-700">{formError.email}</p>
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 pb-1 pl-1"
              >
                Password:
              </label>
              <input
                value={formInput.password}
                onChange={handleUserInput}
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
              />
              <p className="text-red-700">{formError.password}</p>
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 pb-1 pl-1"
              >
                Confirm Password:
              </label>
              <input
                value={formInput.confirmPassword}
                onChange={handleUserInput}
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Confirm your password"
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
              <p className="text-red-700">{formError.confirmPassword}</p>
            </div>
            {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}
            {verificationMsg && (
              <p className="text-blue-600 mb-4">{verificationMsg}</p>
            )}
            <div>
              <p className="text-black text-center">
                Already have an account?{" "}
                <NavLink to="/login" className="font-medium text-purple-500">
                  Login
                </NavLink>
              </p>
            </div>
            <div className="py-2">
              <button
                id="Signup"
                name="Signup"
                className="w-full py-3 bg-purple-500 text-white font-bold rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Signup
              </button>
            </div>
          </form>
          <div className="flex justify-center">
            <ul>
              <li className="my-[5px] pt-3 mx-[10px] text-5xl cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:text-blue-500 inline-block px-2">
                <FontAwesomeIcon icon={faFacebook} />{" "}
              </li>
              <li className="my-[5px] pt-3 mx-[10px] text-5xl cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:text-black inline-block px-2">
                <FontAwesomeIcon icon={faGithub} />
              </li>
              <li className="my-[5px] pt-3 mx-[10px] text-5xl cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:text-[#34A853] inline-block px-2">
                <FontAwesomeIcon icon={faGoogle} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
