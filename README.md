
# CinemaGhar

CinemaGhar is a movie booking website built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to browse movies, view showtimes, and book tickets online. This project aims to provide a seamless and intuitive experience for movie enthusiasts.

## Features
- **User Authentication:** Secure sign-up and login functionality.
- **Movie Listings:** Browse and search for movies.
- **Showtimes:** View available showtimes for selected movies.
- **Booking System:** Reserve and purchase tickets for movies.

## Technologies Used
- **MongoDB:** NoSQL database for storing user and movie data.
- **Express.js:** Web framework for building the backend server.
- **React.js:** Frontend library for building the user interface.
- **Node.js:** JavaScript runtime for server-side logic.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **TMDB API:** For fetching the latest and top movies.

## Live Demo
You can view the live application here: [CinemaGhar](https://cinema-ghar-frontend.vercel.app/)

## Installation

### Prerequisites
- Node.js (>= 14.x)
- MongoDB

### Setup
1. **Clone the Repository**
   ```bash
   git clone https://github.com/hridayanshu236/CinemaGhar.git
   cd CinemaGhar

2. **Backend Setup**
   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `backend` directory and add the following environment variables:
     ```plaintext
     MONGODB_URI = your mongodb connection key
     SECRET = any secret key
     TMDB_API_KEY = Your TMDB api key
     NODE_ENV = false
     ```

3. **Frontend Setup**
   - Navigate to the `frontend` directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `frontend` directory and add the following environment variables:
     ```plaintext
     REACT_APP_BACKEND_URL = your backend url
     ```

4. **Run the Application**
   - **Start the Backend Server**
     ```bash
     cd backend
     npm start
     ```
   - **Start the Frontend Development Server**
     ```bash
     cd ../frontend
     npm start
     ```

## Usage
- Visit the frontend application in your browser to browse movies, select showtimes, and book tickets.






