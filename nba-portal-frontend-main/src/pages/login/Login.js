import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import validator from "validator";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import "./login.css";

import sideImage from "../../assets/Analysis-bro.png";
import Header from "../../components/Header";
import { useLogin } from "../../hooks/useLogin";

const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const { login, isLoading, error } = useLogin();

  const token = Cookies.get('token')
  const role = Cookies.get('role')

  useEffect(() => {
    if(token){
      if(role === "college"){
        navigate("/college")
      } else if (role === "professor") {
        navigate("/professor")
      } else if (role === "admin") {
        navigate("/admin");
      }
      else {
        navigate("/");
      }
    }
  })

  const handleSubmit = async () => {
    setValidationError(null)
    if (!validator.isEmail(email)) {
      setValidationError("Enter a valid email");
      setEmail("");
      setPassword("");
      return;
    }
    if (password.length < 8) {
      setValidationError("Password should contain 8 or more characters");
      setEmail("");
      setPassword("");
      return;
    }
    await login(email, password)
    console.log(error)
    setEmail("");
    setPassword("");
  };

  return (
    <div>
    <div className="banner flex-container align-items-center" style={{
      backgroundColor: "#17415f",
    }}>
      <div style={{ flexGrow: 1 }}>
        <img src="/assets/nba_logo.png" alt="" />
      </div>
      <div style={{ flexGrow: 1 }}>
        <img src="/assets/eNBA_logo.png" alt="" />
      </div>
    </div>
      <section>
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={sideImage} className="img-fluid" alt="Sample" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              {error && <div className="alert alert-danger">{error}</div>}
              {validationError && (
                <div className="alert alert-danger">{validationError}</div>
              )}
              <h3>Login</h3>
              <form>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>
{/* 
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0"></div>
                  <a href="#!" className="text-body">
                    Forgot password?
                  </a>
                </div>

                <input
      type="button"
      value="Don't Have Account?"
      onClick={togglePopup}
      /> */}

                <div className="text-center text-lg-start mt-4 pt-2">
                  {/* <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{
                      paddingLeft: 2.5 + "rem",
                      paddingright: 2.5 + "rem",
                    }}
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    Login
                  </button> */}

            <div className="btn-group btn-groupe_4">
             <button style={{width: 200 + 'px'}} type="button" className="btn btn-Caribbean_Green" onClick={handleSubmit} disabled={isLoading}>
                Login
              </button>
              <button type="button" className="btn btn-Caribbean_Green_2">
                <span
                  className="text-white fa fa-sign-in"
                  aria-hidden="true"
                />
              </button>
            </div>



                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <div
          className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5"
          style={{ backgroundColor: "#17415f" }}
        >
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2020. All rights reserved.
          </div>
        </div> */}
      </section>
      {isOpen && <Popup
      content={<>
        <b>Account Registration</b>
        <p>To register as an evaluator, respective college must apply on behalf of the evaluator on the portal. For colleges applying for accreditation please follow the below button to register.</p>
        <a href="https://enba.nbaind.org/Account/InstituteRegistration.aspx">
        <button>Apply For Accrediation</button>
        </a>
      </>}
      handleClose={togglePopup}
    />}
    </div>
  );
};

export default Login;
