// // src/LandingPage.js
// Special Thanks to Hyperplexed on YT for the Hacker Effect Texts, Modified By My Darling ChatGPT.

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Ensure you have this file for custom styles

const LandingPage = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/auth');
    };

    useEffect(() => {
        const animateText = (element) => {
            let iteration = 0;
            const interval = setInterval(() => {
                element.innerText = element.dataset.value
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return element.dataset.value[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");

                if (iteration >= element.dataset.value.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 10);
        };

        const h1Element = document.querySelector(".animated-text");
        const blockElement = document.querySelector(".animated-block");
        const p2Element = document.querySelector(".animated-block2");



        animateText(h1Element);
        animateText(blockElement);
        animateText(p2Element);

        return () => {
            clearInterval(animateText);

        };
    }, []);

    return (
        <div className="landing-page">
            <h1 className="animated-text" data-value="An App Built For Humanity">An App Built For Humanity</h1>
            <hr className="horizontal-line" />
            <div className="animated-block-container">
                <p className="animated-block" data-value="Ommicang Unite As One.
                Ommicang Together Strong.
                The Very Notion OF Light 
                Spawns From The Existence Of 
                Darkness.
                I was Birth From The Dark. 
                I Become The Light.">
                    Ommicang Unite As One. Ommicang Together Strong.
                    The Very Notion Of Light 
                    Spawns From The Existence Of 
                    Darkness. 
                    I was Birth From The Dark. 
                    I Become The Light.
                </p>
            <p className="animated-block2" data-value="I Am OMMICANG!!!">I Am OMMICANG!!!</p>
            <button className="cta-button" onClick={handleClick}>Be OMMICANG</button>
            </div>
        </div>
    );
};

export default LandingPage;