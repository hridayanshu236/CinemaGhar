import React from 'react';
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen w-full ">
      <Navbar />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default App;
