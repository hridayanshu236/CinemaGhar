import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full flex flex-col justify-between items-center font-poppins text-white bg-black py-[15px] border-y border-gray-700">
      <div className="w-full flex justify-between items-center pl-4">
        <div className="inline-block">
          <h1 className="text-lg font-bold mb-2">Navigate</h1>
          <ul>
            <li>Home</li>
            <li>Movies</li>
            <li>Rates</li>
            <li>Login</li>
            <li>About</li>
          </ul>
        </div>
        <div className="inline-block">
          <h1 className="text-lg font-bold mb-2">Contact Us</h1>
          <ul>
            <li>Home</li>
            <li>Movies</li>
            <li>Rates</li>
            <li>Login</li>
            <li>About</li>
          </ul>
        </div>
        <div className="inline-block">
          <h1 className="text-lg font-bold mb-2 pr-4">Stay Connected</h1>
          <ul>
            <li>Home</li>
            <li>Movies</li>
            <li>Rates</li>
            <li>Login</li>
            <li>About</li>
          </ul>
        </div>
      </div>
      <div className="w-full text-center pt-4">
        <p>&copy; 2024 CinemaGhar. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
