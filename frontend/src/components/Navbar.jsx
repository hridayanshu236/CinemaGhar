import { faBars, faHamburger, faSearch, faSignOut, faUser, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/logo4.png';
import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const [scrollY, setScrollY] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);
    const[isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {isLoggedIn, checkLoginStatus,setIsLoggedIn} = useContext(AuthContext);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (scrollY > 150) {
            setShowNavbar(false);
        } else {
            setShowNavbar(true);
        }
    }, [scrollY]);
    const navigate = useNavigate(); // Initialize navigate

    const toogleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    // Simulate checking login status
    // useEffect(() => {
    //     const checkLoginStatus = async () => {
    //         try {
    //             // Replace this URL with your API endpoint that checks login status
    //             const response = await fetch('http://localhost:3001/api/check-status', {
    //                 method: 'GET',
    //                 credentials: 'include' // Ensure cookies are sent
    //             });
    //             const data = await response.json();
    //             setIsLoggedIn(data.isLoggedIn); // Update state based on response
    //         } catch (error) {
    //             console.error('Error checking login status:', error);
    //         }
    //     };

    //     checkLoginStatus();
    // }, []);
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/logout', {
                method: 'POST',
                credentials: 'include' // Ensure cookies are sent
            });
            const data = await response.json();
            if (response.ok) {
                setIsLoggedIn(false); // Update the state to reflect that the user is logged out
                console.log(data.message); // Handle any success message from the server
                navigate('/login')
            } else {
                console.error('Logout failed:', data.error);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    return (
        <>
        <nav className={`w-full flex md:px-10 justify-between items-center text-white bg-black py-[15px] px-4 border-y border-gray-700 transition-transform duration-500${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className='inline flex-grow'>
                <img className=' w-[px] h-[60px] cursor-pointer' src={logo} alt="Logo" />
                <div className='flex'>
                    <p className='font-semibold text-lg'> <span className='text-purple-500'>Cinema</span></p>
                    <p className='pt-0.5 pl-1'>Ghar</p>
                </div>
        
            </div>
            <div className='block sm:hidden'>
                <FontAwesomeIcon icon={isSidebarOpen ? "" : faBars} onClick={toogleSidebar} className='cursor-pointer'/>

            </div>
            <ul className=' hidden sm:flex items-center md:p'>
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
                   {/* Conditional rendering for Login and Signup */}
                {!isLoggedIn && (
                    <>
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
                                to="/signup"
                                className={({ isActive }) =>
                                    `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium hover:bg-white hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${isActive
                                        ? "text-purple-500 bg-white sm:bg-transparent"
                                        : "text-white"
                                    }`
                                }
                            >
                                Signup
                            </NavLink></li>
                    </>
                )}
                {isLoggedIn && (
                    <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium hover:bg-white hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${isActive
                                    ? "text-purple-500 bg-white sm:bg-transparent"
                                    : "text-white"
                                }`
                            }
                        >
                            <FontAwesomeIcon icon={faSignOut} onClick={handleLogout}/>
                        </NavLink></li>
                )}
            </ul>
            {/* <div className='inline-block px-3 '>
                <FontAwesomeIcon className='px-1' icon={faSearch} />
                <input className='p-1 border-0 outline-none bg-transparent rounded-sm '
                    type="text"
                    placeholder="Search" />
            </div> */}

        </nav>
        <div className={`fixed top-0 left-0 w-[250px] h-full bg-black bg-opacity-50 text-white z-50 transition-transform duration-500 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='flex justify-between items-center p-4'>
                    {/* <img className='w-[50px] h-[60px] cursor-pointer' src={logo} alt="Logo" /> */}
                    <FontAwesomeIcon icon={faX} onClick={toogleSidebar} className='cursor-pointer' />
                </div>
                <ul className='mt-10'>
                <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-mediume hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${isActive
                                ? "text-purple-500 sm:bg-transparent"
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
                            `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${isActive
                                ? "text-purple-500 sm:bg-transparent"
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
                            `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${isActive
                                ? "text-purple-500sm:bg-transparent"
                                : "text-white"
                            }`
                        }
                    >
                        Rates
                    </NavLink></li>
                
                <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium  hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${isActive
                                ? "text-purple-500 sm:bg-transparent"
                                : "text-white"
                            }`
                        }
                    >
                        About
                    </NavLink></li>
                    {/* Conditional rendering for Login and Signup in sidebar */}
                    {!isLoggedIn && (
                        <>
                            <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${isActive
                                            ? "text-purple-500 sm:bg-transparent"
                                            : "text-white"
                                        }`
                                    }
                                >
                                    Login
                                </NavLink></li>
                            <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                                <NavLink
                                    to="/signup"
                                    className={({ isActive }) =>
                                        `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${isActive
                                            ? "text-purple-500 sm:bg-transparent"
                                            : "text-white"
                                        }`
                                    }
                                >
                                    Signup
                                </NavLink></li>
                        </>
                    )}
                    {isLoggedIn && (
                        <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    `w-full h-full py-[10px] px-[30px] m-0 text-xl block font-medium hover:text-purple-500 sm:text-lg sm:hover:bg-transparent sm:p-0 transition-all ease-in duration-300 ${isActive
                                        ? "text-purple-500 sm:bg-transparent"
                                        : "text-white"
                                    }`
                                }
                            >
                                <FontAwesomeIcon icon={faUser}/>
                            </NavLink></li>
                    )}
                </ul>
        </div>
         {/* Overlay for when the sidebar is open */}
         {isSidebarOpen && (
                <div onClick={toogleSidebar} className="fixed inset-0 bg-black bg-opacity-50 z-40">
                    
                </div>
            )}
        </>
    );
}

export default Navbar;
