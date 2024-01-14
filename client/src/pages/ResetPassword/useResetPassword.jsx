import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',  
  });
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

  const redirectToLogin = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['email', 'newPassword', 'confirmPassword'];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
        const response = await axios.post('http://localhost:8800/api/reset-password', formData);
      
        if (response.data.success) {
          setErrorMessage('Password changed successfully');
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMessage('You can only reset your password once in a day.');
        } else {
          setErrorMessage('Error resetting password.');
        }
      }
      
  };

  return {
    formData,
    errorMessage,
    handleInputChange,
    handleSubmit,
    handleLoginRedirect: redirectToLogin,
    handleRegistrationRedirect: redirectToRegistration,
  };
};

export default useResetPassword;
