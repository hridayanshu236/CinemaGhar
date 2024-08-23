import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/logo3.svg';
import React from 'react';

const Navbar = () => {
  return (
    <nav className='w-full flex justify-between items-center font-poppins text-white bg-black py-[15px] px-4 border-y border-gray-700'>
      <div className='flex-grow'>
        <img className='w-[100px] h-[80px] cursor-pointer' src={logo} alt="Logo" />
      </div>
      <ul className='flex-3 text-center'>
        <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>Home</li>
        <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>Movies</li>
        <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>Rates</li>
        <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>Login</li>
        <li className='inline-block my-[10px] mx-[20px] text-lg cursor-pointer'>About</li>
      </ul>
      <div className='inline-block px-3 border rounded-xl'>
        <FontAwesomeIcon className='px-1' icon={faSearch} />
        <input className='p-1 border-0 outline-none bg-transparent rounded-sm' type="text" placeholder="Search" />
      </div>
    </nav>
  );
}

export default Navbar;
