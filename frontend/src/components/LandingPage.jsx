import React, { useEffect, useRef, useState } from 'react';
import hero from '../assets/hero.jpg';
import Movies from './Movies'; // Import the Movies component

const LandingPage = () => {
    const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 } // Adjust this value based on when you want the effect to trigger
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

    return (
        <div className='max-w-full mx-auto'>
            <section 
            ref={ref}
            className={` flex flex-col items-center mt-20 relative transition-opacity duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className='flex w-full justify-center p-l-4 p-r-4'>
                <h1 className='text-5xl lg:text-[4rem] uppercase font-bold'>
                    <span className='text-purple-500'> Cinema</span>Ghar
                </h1>
                </div>
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
