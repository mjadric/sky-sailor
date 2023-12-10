// UseRegistration.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requiredFields = ['email', 'password', 'firstName', 'lastName'];
    const missingFields = requiredFields.filter((field) => !formData[field]);
  
    if (missingFields.length > 0) {
      setErrorMessage(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8800/api/signup', formData);
  
      if (response.data.success) {
        setIsRegistered(true);
        setErrorMessage('');
        redirectToLogin();
      } else {
        setIsRegistered(false);
        setErrorMessage(response.data.error || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration Error:', error.response ? error.response.data : error.message);
      setIsRegistered(false);
      setErrorMessage('Internal server error.');
    }
  };
  

  return {
    formData,
    isRegistered,
    errorMessage,
    handleInputChange,
    handleSubmit,
    handleLoginRedirect: redirectToLogin,
  };
};

export default useRegistration;
