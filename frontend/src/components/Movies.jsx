import React, { useEffect, useRef, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

const Movies = () => {
  const { movies, mostPopularMovie } = useContext(MovieContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

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
      { threshold: 0.1 }
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

  const navigate = useNavigate();

  const handleBuytickets = (movie) => {
    if (isLoggedIn) {
      setIsLoggedIn(true);
      navigate('/ticketbooking', { state: { selectedMovie: movie } });
    } else {
      setIsLoggedIn(false);
      navigate('/login');
    }
  };

  const moviesToDisplay = movies.slice(0, 10);

  return (
    <div
      ref={ref}
      className={`relative transition-opacity duration-1000 bg-gradient-to-r from-purple-100 to-slate-100 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 "
      }`}
    >
      {mostPopularMovie && mostPopularMovie.poster_path ? (
        <div className="relative pb-3">
          <div className="block w-1/2 h-1/2 m-auto justify-center">
            <div className="w-full inline-block p-2 border shadow-xl rounded-lg">
              <img
                src={`https://image.tmdb.org/t/p/w500${mostPopularMovie.poster_path}`}
                alt={`${mostPopularMovie.title} poster`}
                className="m-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="">
              <p className="text-2xl font-semibold p-2 text-center">
                {mostPopularMovie.title}
              </p>
            </div>
          </div>
          <div className="absolute top-1 left-0  ">
            <p className="font-bold text-black text-center md:text-3xl text-lg bg-opacity-60 p-4 rounded-lg">
              <span className="text-purple-500">Top</span> Rated
            </p>
          </div>
          <div className="flex relative justify-center p-2">
            <button
              onClick={() => handleBuytickets(mostPopularMovie)}
              className="bg-purple-500 text-white text-lg px-6 py-1 rounded-xl mt-2 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Buy Tickets
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          Loading top-rated movie...
        </div>
      )}

      <div className="flex flex-col justify-center pt-3 items-center">
        <div className="flex pd-4">
          <p className="font-bold text-black text-center text-3xl bg-opacity-60 p-4 rounded-lg">
            <span className="text-purple-500">Now</span> Showing
          </p>
        </div>
        <div className="flex w-full justify-center p-5 overflow-x-hidden">
          <Slider {...settings} className="w-full max-w-5xl">
            {moviesToDisplay.map((movie) => (
              <div key={movie.id} className="text-black rounded-xl">
                <div className="rounded-t-xl flex justify-center items-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    className="h-45 w-40 shadow-xl rounded-lg object-cover rounded-1xl mix-blend-overlay cursor-pointer transition-opacity duration-300 hover:opacity-40"
                  />
                </div>
                <div className="flex flex-col justify-center items-center p-4">
                  <p className="text-xl font-semibold">{movie.title}</p>
                  <p>{movie.overview}</p>
                </div>
                <div className="flex justify-center p-2">
                  <button
                    onClick={() => handleBuytickets(movie)}
                    className="bg-purple-500 text-white text-lg px-6 py-1 rounded-xl mt-2 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    Buy Tickets
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Movies;
