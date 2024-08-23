import React from 'react';

const Footer = () => {
    return (
        <footer className="w-screen flex flex-col justify-between items-center ml-auto text-white bg-black py-[15px] border-y border-gray-700">
            <div className="w-screen flex justify-between items-center px-7">
                <div className="inline-block">
                    <h1 className="text-lg font-bold mb-2">Navigate</h1>
                    <div className="mb-4">
                        <ul>
                            <li>Home</li>
                            <li>Movies</li>
                            <li>Rates</li>
                            <li>Login</li>
                            <li>About</li>
                        </ul>
                    </div>
                </div>
                <div className="inline-block">
                    <h1 className="text-lg font-bold mb-2">Contact Us</h1>
                    <div className="mb-4">
                        <ul>
                            <li>Home</li>
                            <li>Movies</li>
                            <li>Rates</li>
                            <li>Login</li>
                            <li>About</li>
                        </ul>
                    </div>
                </div>
                <div className="inline-block">
                    <h1 className="text-lg font-bold mb-2">Stay Connected</h1>
                    <div className="mb-4">
                        <ul>
                            <li>Home</li>
                            <li>Movies</li>
                            <li>Rates</li>
                            <li>Login</li>
                            <li>About</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="w-screen inline-block text-center pt-3">
                <p>&copy; 2024 CinemaGhar. All rights reserved.</p>
            </div>

        </footer>
    );
};

export default Footer;
