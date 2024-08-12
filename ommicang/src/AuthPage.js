import React from 'react';
import './Authpage.css'; // Ensure you have this file for custom styles
import logo from './IMGs/Logo.jpg'; // Import the image file

const AuthPage = () => {
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
                {/* <div className="inputBox">
                    <input type="password" required />
                    <span>Password</span>
                    <i></i>
                </div> */}
                {/* <div className="links">
                    <a href="#">Forgot Password</a>
                    <a href="#">Sign Up</a>
                </div> */}
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    );
};

export default AuthPage;



// // src/AuthPage.js

// import React, { useState } from 'react';
// import './Authpage.css'; // Ensure you have this file for custom styles

// const AuthPage = () => {
//     const [isLogin, setIsLogin] = useState(true);

//     const toggleForm = () => {
//         setIsLogin(!isLogin);
//     };

//     return (
//         <div className="auth-page">
//             <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
//             <form className="auth-form">
//                 {!isLogin && (
//                     <div className="form-group">
//                         <label htmlFor="username">Username:</label>
//                         <input type="text" id="username" name="username" required />
//                     </div>
//                 )}
//                 <div className="form-group">
//                     <label htmlFor="email">Email:</label>
//                     <input type="email" id="email" name="email" required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="password">Password:</label>
//                     <input type="password" id="password" name="password" required />
//                 </div>
//                 <button type="submit" className="auth-button">
//                     {isLogin ? 'Login' : 'Sign Up'}
//                 </button>
//             </form>
//             <button onClick={toggleForm} className="toggle-button">
//                 {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login'}
//             </button>
//         </div>
//     );
// };

// export default AuthPage;
