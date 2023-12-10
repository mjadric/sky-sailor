import React from 'react';
import LoginForm from './LoginForm';
import useLogin from './useLogin';

const LoginPage = () => {
  const {
    email,
    password,
    handleInputChange,
    handleSubmit,
    handleRegistrationRedirect,
  } = useLogin();

  return (
    <div>
      <LoginForm
        email={email}
        password={password}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleRegistrationRedirect={handleRegistrationRedirect}
      />
    </div>
  );
};

export default LoginPage;
