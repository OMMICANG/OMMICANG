import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Ensure you have this file for custom styles
import Preloader from './preloader'; // Import the Preloader component
import LandingPage from './landingPage'; // Import the landingPage component
import AuthPage from './AuthPage';
import IsMobile from './IsMobile'; // Import the IsMobile component
import HomePage from './HomePage' // Import HomePage Component

// Define the type for the window object with Telegram
interface TelegramWindow extends Window {
  Telegram: {
    WebApp: {
      ready: () => void;
      expand: () => void;
    };
  };
}

// Create a type assertion for window
declare const window: TelegramWindow;

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleTelegramInit = () => {
      const webapp = window.Telegram.WebApp;

      webapp.ready(); // Initialize The Web App

      webapp.expand(); // Expand The Web App To Full Height

      // Simulate a loading delay for demonstration purposes
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Adjust the delay as needed
    };

    // Ensure the Telegram Web App SDK is loaded before trying to initialize
    if (window.Telegram) {
      handleTelegramInit();
    } else {
      document.addEventListener('TelegramWebAppReady', handleTelegramInit);
    }

    return () => {
      document.removeEventListener('TelegramWebAppReady', handleTelegramInit);
    };
  }, []);

  return (
    <Router>
      <IsMobile>
        <div>
          {loading ? (
            <Preloader />
          ) : (
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/home" element={<HomePage />} />
            </Routes>
          )}
        </div>
      </IsMobile>


    </Router>
  );
};

export default App;
