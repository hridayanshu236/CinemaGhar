import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [mostPopularMovie, setMostPopularMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/movies'); // Your backend endpoint
        const movieList = response.data;
        setMovies(movieList);

        if (movieList.length > 0) {
          // Find the most popular movie
          const popularMovie = movieList.reduce((prev, current) =>
            (prev.popularity > current.popularity) ? prev : current
          );
          setMostPopularMovie(popularMovie);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ movies, mostPopularMovie }}>
      {children}
    </MovieContext.Provider>
  );
};
