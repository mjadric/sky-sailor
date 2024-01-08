import LoginForm from './LoginForm'; 
import useLogin from './useLogin'; 

const LoginPage = () => {
  const {
    formData,
    isLoggedIn,
    errorMessage,
    handleInputChange,
    handleSubmit,
    handleRegistrationRedirect, 
  } = useLogin(); 

  return (
    <div>
      <LoginForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleRegistrationRedirect={handleRegistrationRedirect}
        errorMessage={errorMessage}
        isLoggedIn={isLoggedIn} 
      />
    </div>
  );
};

export default LoginPage;
