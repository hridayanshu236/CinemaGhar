import React, { useEffect, useRef, useState } from 'react';
import deadpool from '../assets/deadpool.jpeg';
import oppenhiemer from '../assets/oppenheimer.jpg';
import barbie from '../assets/barbie.jpg';
import jawan from '../assets/jawan.jpg';
import rocky from '../assets/rocky.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Movies = () => {
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
            {data.map((d, index) => (
              <div key={index} className=' h-[450px] text-black rounded-xl'>
                <div className='rounded-t-xl flex justify-center items-center'>
                  <img src={d.img} alt='' className='h-45 w-40 shadow-xl rounded-lg object-cover rounded-1xl mix-blend-overlay cursor-pointer transition-opacity duration-300 hover:opacity-40 ' />
                </div>
                <div className='flex flex-col justify-center items-center p-4'>
                  <p className='text-xl font-semibold'>{d.name}</p>
                  <p>{d.plot}</p>
                  <button className='bg-purple-500 text-white text-lg px-6 py-1 rounded-xl mt-2  hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500'>
                    Buy Tickets
                  </button>
                </div>
              </div>
            ))}
          </Slider>

        </div>
      </div>
    </section>
  );
};

const data = [
  {
    name: "Oppenheimer",
    img: oppenhiemer,
    plot: "A dramatization of the life of J. Robert Oppenheimer, the scientist who led the development of the atomic bomb during World War II.",
  },
  {
    name: "Barbie",
    img: barbie,
    plot: "A Barbie doll is expelled from Barbieland for being less than perfect, and sets off on a journey to discover who she truly is.",
  },
  {
    name: "Jawan",
    img: jawan,
    plot: "A high-octane action thriller featuring Shah Rukh Khan, about a man seeking justice for his family and confronting corruption.",
  },
  {
    name: "Rocky Aur Rani Ki Prem Kahani",
    img: rocky,
    plot: "A romantic drama about two individuals from different backgrounds who fall in love despite the odds and familial expectations.",
  },
];

export default Movies;
