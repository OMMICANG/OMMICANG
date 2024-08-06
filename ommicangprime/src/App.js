import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Ensure you have this file for custom styles
import Preloader from './preloader'; //Import the Preloader component
import LandingPage from './landingPage'; //import the landingPage component
import AuthPage from './AuthPage';

function App() {
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

            <div>
                {loading ? <Preloader /> : (
                    <Routes>
                        <Route path="/" element={<LandingPage />}/>
                        <Route path="/auth" element={<AuthPage />}/>
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
