import React, { useEffect, useRef, useState, useContext } from 'react';
import deadpool from '../assets/deadpool.jpeg';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NavLink } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

const Movies = () => {
  const { movies } = useContext(MovieContext);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
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
  // Slice the first 5 movies for display
  const moviesToDisplay = movies.slice(0, 5);
  return (
    <section
      ref={ref}
      className={`relative transition-opacity duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className='relative '>
        <img src={deadpool} alt="deadpool" className='w-full h-auto object-cover rounded-lg shadow-lg' />

        <div className='absolute top-1 left-2 '>
          <p className='font-bold text-black text-center text-3xl bg-opacity-60 p-4 rounded-lg'>
            <span className='text-purple-500'>Top</span> Rated
          </p>
        </div>
        <div>
          <p className='font-bold text-black text-center text-3xl  bg-opacity-60 p-4 rounded-lg'>
            <span className='text-purple-500'>Now</span> Showing
          </p>
        </div>

        {/* Carousel positioned */}
        <div className='flex justify-center mt-8'>
          <Slider {...settings} className='w-full max-w-5xl'>
            {moviesToDisplay.map((movie) => (
              <div key={movie.id} className=' h-[450px] text-black rounded-xl'>
                <div className='rounded-t-xl flex justify-center items-center'>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                   alt='movie.title' className='h-45 w-40 shadow-xl rounded-lg object-cover rounded-1xl mix-blend-overlay cursor-pointer transition-opacity duration-300 hover:opacity-40 ' />
                </div>
                <div className='flex flex-col justify-center items-center p-4'>
                  <p className='text-xl font-semibold'>{movie.title}</p>
                  <p>{movie.overview}</p>
                  <NavLink to='/ticketbooking'>
                  <button className='bg-purple-500 text-white text-lg px-6 py-1 rounded-xl mt-2  hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500'>
                    Buy Tickets
                  </button>
                  </NavLink>
                </div>
              </div>
            ))}
          </Slider>

        </div>
      </div>
    </section>
  );
};



export default Movies;
