import React from 'react';
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import About from "./components/About";
import Rates from './components/Rates';
import Movies from './components/Movies';
const App = () => {
  return (
    <>
      <Navbar/>
      <div className='flex flex-col min-h-screen w-full'>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/rates' element={<Rates/>} />
          <Route path='/movies' element={<Movies/>} />
        </Routes>
      </div>
    
      <Footer/>
    </>
  );
}

export default App;
