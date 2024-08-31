import { faBars, faX, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/logo4.png';
import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const [scrollY, setScrollY] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

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
        const threshold = 150;
        if (scrollY > threshold) {
            setShowNavbar(false);
        } else {
            setShowNavbar(true);
        }
    }, [scrollY]);

    const navigate = useNavigate(); 

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleLogout = async () => {
        try {
            const response = await fetch('${process.env.REACT_APP_BACKEND_URL}/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                setIsLoggedIn(false);
                console.log(data.message);
                navigate('/login');
            } else {
                console.error('Logout failed:', data.error);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <>
            <nav className={`w-full flex md:px-10 justify-between items-center text-white bg-black py-[15px] px-4 border-y border-gray-700 transition-transform duration-500 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className='flex items-center'>
                    <img className='w-[60px] h-[60px] cursor-pointer' src={logo} alt="Logo" />
                    <div className='flex'>
                        <p className='font-semibold text-lg'><span className='text-purple-500'>Cinema</span></p>
                        <p className='pt-0.5 pl-1'>Ghar</p>
                    </div>
                </div>
                <div className='block sm:hidden'>
                    <FontAwesomeIcon icon={isSidebarOpen ? faX : faBars} onClick={toggleSidebar} className='cursor-pointer' />
                </div>
                <ul className='hidden sm:flex items-center'>
                    <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                        <NavLink to="/" className={({ isActive }) => isActive ? "text-purple-500 bg-white sm:bg-transparent" : "text-white"}>
                            Home
                        </NavLink>
                    </li>
                    <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                        <NavLink to="/movies" className={({ isActive }) => isActive ? "text-purple-500 bg-white sm:bg-transparent" : "text-white"}>
                            Movies
                        </NavLink>
                    </li>
                    <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                        <NavLink to="/rates" className={({ isActive }) => isActive ? "text-purple-500 bg-white sm:bg-transparent" : "text-white"}>
                            Rates
                        </NavLink>
                    </li>
                    <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                        <NavLink to="/about" className={({ isActive }) => isActive ? "text-purple-500 bg-white sm:bg-transparent" : "text-white"}>
                            About
                        </NavLink>
                    </li>
                    {!isLoggedIn ? (
                        <>
                            <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                                <NavLink to="/login" className={({ isActive }) => isActive ? "text-purple-500 bg-white sm:bg-transparent" : "text-white"}>
                                    Login
                                </NavLink>
                            </li>
                            <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                                <NavLink to="/signup" className={({ isActive }) => isActive ? "text-purple-500 bg-white sm:bg-transparent" : "text-white"}>
                                    Signup
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                                <NavLink to="/profile" className={({ isActive }) => isActive ? "text-purple-500 bg-white sm:bg-transparent" : "text-white"}>
                                    <FontAwesomeIcon icon={faUser} />
                                </NavLink>
                            </li>
                            <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                                <FontAwesomeIcon icon={faSignOut} onClick={handleLogout} className="cursor-pointer" />
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <div className={`fixed top-0 left-0 w-[250px] h-full bg-black bg-opacity-50 text-white z-50 transition-transform duration-500 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='flex justify-between items-center p-4'>
                    <FontAwesomeIcon icon={faX} onClick={toggleSidebar} className='cursor-pointer' />
                </div>
                <ul className='mt-10'>
                    <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                        <NavLink to="/" className={({ isActive }) => isActive ? "text-purple-500 sm:bg-transparent" : "text-white"}>
                            Home
                        </NavLink>
                    </li>
                    <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                        <NavLink to="/movies" className={({ isActive }) => isActive ? "text-purple-500 sm:bg-transparent" : "text-white"}>
                            Movies
                        </NavLink>
                    </li>
                    <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                        <NavLink to="/rates" className={({ isActive }) => isActive ? "text-purple-500 sm:bg-transparent" : "text-white"}>
                            Rates
                        </NavLink>
                    </li>
                    <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                        <NavLink to="/about" className={({ isActive }) => isActive ? "text-purple-500 sm:bg-transparent" : "text-white"}>
                            About
                        </NavLink>
                    </li>
                    {!isLoggedIn ? (
                        <>
                            <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                                <NavLink to="/login" className={({ isActive }) => isActive ? "text-purple-500 sm:bg-transparent" : "text-white"}>
                                    Login
                                </NavLink>
                            </li>
                            <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                                <NavLink to="/signup" className={({ isActive }) => isActive ? "text-purple-500 sm:bg-transparent" : "text-white"}>
                                    Signup
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                                <NavLink to="/profile" className={({ isActive }) => isActive ? "text-purple-500 sm:bg-transparent" : "text-white"}>
                                    <FontAwesomeIcon icon={faUser} />
                                </NavLink>
                            </li>
                            <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>
                                <FontAwesomeIcon icon={faSignOut} onClick={handleLogout} className="cursor-pointer" />
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </>
    );
};

export default Navbar;
