import ResetPasswordForm from './ResetPasswordForm'; 
import useResetPassword from './useResetPassword'; 

const ResetPassword = () => {
  const {
    formData,
    errorMessage,
    handleInputChange,
    handleSubmit,
    handleLoginRedirect,
    handleRegistrationRedirect
  } = useResetPassword(); 

  return (
    <div>
      <ResetPasswordForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleLoginRedirect={handleLoginRedirect}
        handleRegistrationRedirect={handleRegistrationRedirect}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default ResetPassword;
