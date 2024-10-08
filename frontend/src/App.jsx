import React, { createContext } from 'react';
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import About from "./components/About";
import Rates from './components/Rates';
import Movies from './components/Movies';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Ticketbooking from './components/Ticketbooking';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import VerifyEmail from './components/VerifyEmail';


const App = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen w-full bg-gradient-to-r from-purple-100 to-slate-100 ">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/ticketbooking" element={<Ticketbooking />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
