import React, { useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { register } from '../api';
import Login from './login';

const Register = () => {
  const [formData, setFormData] =useState({ email: '', password: '' });
  const [error, setError] =useState(null);
  const [success, setSuccess] =useState(false);
  const [captchaValue, setCaptchaValue] =useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);


    if (!captchaValue) {
      alert('Please complete the CAPTCHA.');
      return;
    }

    try {
      const captchaResponse = await fetch('http://localhost:5000/verify-captcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ captchaToken: captchaValue }),
      });

      const captchaResult=await captchaResponse.json();
console.log(captchaResult);
      if (captchaResponse.ok) {
        
        const{data}=await register(formData); 
        localStorage.setItem('token',data.token);
        setSuccess(true);
      }else{
        throw new Error(captchaResult.message);
      }
    }catch(error) {
      setError('Registration failed. Please try again.');
      console.error('Error during registration', error);
    }
  };

  const handleCaptchaChange=(value)=>{
    setCaptchaValue(value);
  };

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 group">
            <label className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-5"
              placeholder="Enter your username"
              required
            />
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name='email'
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-6 flex justify-center">
            <HCaptcha
              sitekey="458a23e0-c63a-45a0-baa6-dc4abe4ef920"
              onChange={handleCaptchaChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Submit
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {success && <p className="text-green-500 text-center mt-2">Registration successful!</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
