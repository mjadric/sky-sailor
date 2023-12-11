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
        errorMessage={errorMessage} 
        isRegistered={isRegistered}
      />
    </div>
  );
};

export default RegistrationPage;
