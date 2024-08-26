import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const MovieContext = createContext();

export const MovieProvider = ({children}) =>{
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const fetchMovies = async () => {
          try {
            const response = await axios.get('http://localhost:3001/api/movies'); // Your backend endpoint
            setMovies(response.data);
          } catch (error) {
            console.error('Error fetching movies:', error);
          }
        };
    
        fetchMovies();
      }, []);
 return (
    <MovieContext.Provider value={{ movies }}>
      {children}
    </MovieContext.Provider>
  );
};