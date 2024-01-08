import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const redirectToRegistration = () => {
    navigate('/registration');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requiredFields = ['email', 'password'];
    const missingFields = requiredFields.filter((field) => !formData[field]);
  
    if (missingFields.length > 0) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8800/api/login', formData);
    
      if (response.data.success) {
        setIsLoggedIn(true);
        setErrorMessage('');
        // Redirect to the landingpage kad bude napravljena
        // navigate('/landingpage');
      }
    } catch (error) {
      setErrorMessage('Account does not exist.');
      setIsLoggedIn(false);
    }
    
  };
  

  return {
    formData,
    isLoggedIn,
    errorMessage,
    handleInputChange,
    handleSubmit,
    handleRegistrationRedirect: redirectToRegistration,
  };
};

export default useLogin;
