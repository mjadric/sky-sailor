import React from 'react';
import RegistrationForm from './RegistrationForm';
import useRegistration from './UseRegistration';

const RegistrationPage = () => {
  const {
    formData,
    isRegistered,
    errorMessage,
    handleInputChange,
    handleSubmit,
    handleLoginRedirect,
  } = useRegistration();

  return (
    <div>
      <RegistrationForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleLoginRedirect={handleLoginRedirect}
      />
      {isRegistered && <p>Registration successful!</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
};

export default RegistrationPage;
