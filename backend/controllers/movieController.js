// controllers/movieController.js
const axios = require('axios');
require('dotenv').config({ path: './.env' });

const TMDB_API_KEY = process.env.TMDB_API_KEY;

exports.getMovies = async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        page: 1 // You can adjust the page number as needed
      }
    });
    res.json(response.data.results); // Return the list of movies
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
