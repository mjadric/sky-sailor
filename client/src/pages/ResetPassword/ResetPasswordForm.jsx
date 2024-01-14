// ResetPasswordForm.jsx

import React from 'react';

const ResetPasswordForm = ({
  formData: { email, newPassword, confirmPassword },  
  handleInputChange,
  handleSubmit,
  handleLoginRedirect,
  handleRegistrationRedirect,
  errorMessage,
}) => {
  return (
    <section className="text-center text-lg-start">
      <style>
        {`
          .cascading-right {
            margin-right: -50px;
          }

          @media (max-width: 991.98px) {
            .cascading-right {
              margin-right: 0;
            }
          }

          body {
            background: linear-gradient(to right, #333, #f5f5f5);
          }
        `}
      </style>

      <div className="container py-4">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div
              className="card cascading-right"
              style={{
                background: 'hsla(0, 0%, 100%, 0.55)',
                backdropFilter: 'blur(30px)',
              }}
            >
              <div className="card-body p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Reset Your Password</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                    />
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      name="newPassword"
                      value={newPassword}
                      onChange={handleInputChange}
                    />
                    <label className="form-label" htmlFor="form3Example4">
                      New Password
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example5"
                      className="form-control"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleInputChange}
                    />
                    <label className="form-label" htmlFor="form3Example5">
                      Confirm Password
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-4">
                    Reset
                  </button>

                  <p className="mb-0">
                    Back to login{' '}
                    <button type="button" className="btn btn-link" onClick={handleLoginRedirect}>
                      Log in
                    </button>
                  </p>

                  <p className="mb-0">
                    Don't have an account?{' '}
                    <button type="button" className="btn btn-link" onClick={handleRegistrationRedirect}>
                      Sign up
                    </button>
                  </p>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0">
            <img
              src="https://i.pinimg.com/564x/af/00/2c/af002c5239fccf24e8d1c42168467c58.jpg"
              className="w-100 rounded-4 shadow-4"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordForm;
