import React from 'react';
import './Authpage.css'; // Ensure you have this file for custom styles
import logo from './IMGs/Logo.jpg'; // Import the image file

const AuthPage: React.FC = () => {
    return (
        <div className="box">
            <span className="borderLine"></span>
            <form>
                <img src={logo} alt="Logo" className="form-logo" />
                <h2>Sign In</h2>
                <h5>Hey, Stranger!</h5>
                <div className="inputBox">
                    <input type="text" required />
                    <span>Enter Name</span>
                    <i></i>
                </div>
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    );
};

export default AuthPage;
