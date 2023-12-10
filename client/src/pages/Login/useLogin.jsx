// useLogin.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const redirectToRegistration = () => {
    navigate('/registration', { replace: true });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8800/api/login', { email, password });
      console.log('Server Response:', response.data);

      if (response.data.success) {
        console.log('Login successful!');
        // Ovdje možete dodati dodatne radnje nakon uspješne prijave
      } else {
        console.log('Login failed:', response.data.error);
        setErrorMessage(response.data.error || 'Login failed.');
      }
    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message);
    }
  };

  return {
    email,
    password,
    handleInputChange,
    handleSubmit,
    handleRegistrationRedirect: redirectToRegistration,
    errorMessage,
  };
};

export default useLogin;
