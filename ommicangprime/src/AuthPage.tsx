import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Authpage.css';
import logo from './IMGs/Logo.jpg';

declare global {
  interface Window {
    Telegram: any;
  }
}

const AuthPage: React.FC = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const telegram = window.Telegram.WebApp;
    telegram.ready();

    const telegramUser = telegram.initDataUnsafe?.user;

    // Check if telegramUser is defined
    if (telegramUser && telegramUser.id) {
      const userId = telegramUser.id;

      try {
        const response = await fetch('https://servertest-2l8a.onrender.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, telegramId: userId }),
        });

        if (response.ok) {
          telegram.showPopup({ message: 'Sign up successful!', buttons: [{ text: 'OK' }] });
          navigate('/homepage');
        } else {
          setError('Failed to register user');
          telegram.showPopup({ message: 'Sign up failed. Please try again later.', buttons: [{ text: 'OK' }] });
        }
      } catch (error) {
        setError('Error occurred during sign-up');
        telegram.showPopup({ message: 'Sign up failed. Please try again later.', buttons: [{ text: 'OK' }] });
        console.error('Error:', error);
      }
    } else {
      setError('Telegram user data is undefined or does not contain an ID');
      telegram.showPopup({ message: 'Sign up failed. Invalid user data.', buttons: [{ text: 'OK' }] });
      console.error('Telegram user data is undefined or does not contain an ID');
    }

    setLoading(false);
  };

  return (
    <div className="box">
      <span className="borderLine"></span>
      <form onSubmit={handleSignUp}>
        <img src={logo} alt="Logo" className="form-logo" />
        <h2>Sign In</h2>
        <h5>Hey, Stranger!</h5>
        <div className="inputBox">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <span>Enter Name</span>
          <i></i>
        </div>
        <input type="submit" value={loading ? 'Signing Up...' : 'Sign Up'} disabled={loading} />
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AuthPage;










// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Authpage.css';
// import logo from './IMGs/Logo.jpg';

// declare global {
//   interface Window {
//     Telegram: any;
//   }
// }

// const AuthPage: React.FC = () => {
//   const [name, setName] = useState('');
//   const navigate = useNavigate();

//   const handleSignUp = async (event: React.FormEvent) => {
//     event.preventDefault();
    
//     const telegram = window.Telegram.WebApp;
//     telegram.ready();
//     const userId = telegram.initDataUnsafe.user.id;

//     try {
//       const response = await fetch('https://servertest-2l8a.onrender.com', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, telegramId: userId }),
//       });

//       if (response.ok) {
//         navigate('/homepage');
//       } else {
//         console.error('Failed to register user');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="box">
//       <span className="borderLine"></span>
//       <form onSubmit={handleSignUp}>
//         <img src={logo} alt="Logo" className="form-logo" />
//         <h2>Sign In</h2>
//         <h5>Hey, Stranger!</h5>
//         <div className="inputBox">
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <span>Enter Name</span>
//           <i></i>
//         </div>
//         <input type="submit" value="Sign Up" />
//       </form>
//     </div>
//   );
// };

// export default AuthPage;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Authpage.css'; // Ensure you have this file for custom styles
// import logo from './IMGs/Logo.jpg'; // Import the image file

// const AuthPage: React.FC = () => {
//     const [name, setName] = useState<string>('');
//     const [error, setError] = useState<string | null>(null);
//     const [success, setSuccess] = useState<string | null>(null); // Add state for success message
//     const navigate = useNavigate();

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();

//         if (window.Telegram && window.Telegram.WebApp) {
//             const telegram = window.Telegram.WebApp;

//             try {
//                 const response = await fetch('/api/saveUser', { // Adjust the API endpoint as necessary
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         name,
//                         telegramId: telegram.initDataUnsafe.user?.id // Assuming the user ID is available
//                     }),
//                 });

//                 if (!response.ok) {
//                     throw new Error('Network response was not ok.');
//                 }

//                 const result = await response.json();
//                 setSuccess('User saved successfully!'); // Handle success
//                 console.log(result);

//                 // Redirect to HomePage
//                 navigate('/home');
//             } catch (err) {
//                 setError('An error occurred while saving the user.');
//                 console.error(err);
//             }
//         } else {
//             setError('Telegram Web App is not initialized.');
//         }
//     };

//     return (
//         <div className="box">
//             <span className="borderLine"></span>
//             <form onSubmit={handleSubmit}>
//                 <img src={logo} alt="Logo" className="form-logo" />
//                 <h2>Sign In</h2>
//                 <h5>Hey, Stranger!</h5>
//                 <div className="inputBox">
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                     <span>Enter Name</span>
//                     <i></i>
//                 </div>
//                 <input type="submit" value="Sign Up" />
//                 {error && <p className="error">{error}</p>}
//                 {success && <p className="success">{success}</p>} {/* Display success message */}
//             </form>
//         </div>
//     );
// };

// export default AuthPage;




// import React from 'react';
// import './Authpage.css'; // Ensure you have this file for custom styles
// import logo from './IMGs/Logo.jpg'; // Import the image file

// const AuthPage: React.FC = () => {
//     return (
//         <div className="box">
//             <span className="borderLine"></span>
//             <form>
//                 <img src={logo} alt="Logo" className="form-logo" />
//                 <h2>Sign In</h2>
//                 <h5>Hey, Stranger!</h5>
//                 <div className="inputBox">
//                     <input type="text" required />
//                     <span>Enter Name</span>
//                     <i></i>
//                 </div>
//                 <input type="submit" value="Sign Up" />
//             </form>
//         </div>
//     );
// };

// export default AuthPage;
