import React from 'react';
import hero from '../assets/hero.jpg';
import Movies from './Movies'; // Import the Movies component

const LandingPage = () => {

    return (
        <div className='max-w-full mx-auto'>
            <section className='flex flex-col items-center mt-20'>
                <h1 className='text-6xl lg:text-[4rem] uppercase font-bold'>
                    <span className='text-purple-500'> Cinema</span>Ghar
                </h1>
                <p className='lg:mt-6 text-sm mb-4 font-medium -tracking-tighter'>
                    Your Ultimate Movie Experience Starts Here
                </p>
                <div className='relative flex flex-col bg-gradient-to-tr from-purple-500 to-green-700'>
                    <img src={hero} className='w-full object-cover rounded-1xl mix-blend-overlay' alt="Hero" />
                    <p className='absolute inset-0 flex items-center justify-center font-bold text-white text-center text-3xl bg-black bg-opacity-60 p-4 rounded-lg'>
                        "Seamless Ticketing for Movie Lovers"
                    </p>
                </div>
            </section>
            
            <Movies />
        </div>
    );
}

export default LandingPage;
