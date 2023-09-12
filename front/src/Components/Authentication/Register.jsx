import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Login.css"; 

function Register() {
  const navigate = useNavigate();
  const api = "http://localhost:3001";
  const [ID,setID] = useState('');
  const [firstname,setrFirstname] = useState('');
  const [lastname,setLastname] = useState('');
  const [ email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [IDError, setIDError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [BioError, setBioError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [registerError, setregisterError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  

  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }
  
  function toggleConfirmPasswordVisibility() {
    setShowConfirmPassword((prevState) => !prevState);
  }


  

  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  function validatePassword(password) {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  }

  function hsn(e) {
    e.preventDefault();

    setNameError("");
    setLastNameError("");
    setIDError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setregisterError("");
    let isValid = true;

    // Validate each field and set corresponding error messages
    if (!firstname) {
      setNameError("First name is required.");
      isValid = false;
    }

    if (!lastname) {
      setLastNameError("Last name is required.");
      isValid = false;
    }

    if (!ID) {
        setIDError("Profile Picture is required.");
      isValid = false;
    }

    

    if (!email) {
      setEmailError("Email address is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must contain at least 8 characters, including one uppercase letter, one special character, and one number."
      );
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (isValid) {
      const userData = new FormData();
      userData.append('ID',ID);
      userData.append('firstname',firstname);
      userData.append('lastname',lastname);
      userData.append('email',email);
      userData.append('password',confirmPassword);

      axios
        .post(`${api}/register`, userData)
        .then((response) => {
          console.log("Registration successful!");
          localStorage.clear(); // Clear localStorage here
          navigate("/login");
        })
        .catch((error) => {
          if (error.response) {
            const { data } = error.response;
            console.log("Backend error response:", data); // Log the backend error response
            if (data.error === "Email already registered") {
              console.log("Email already registered");
              setregisterError('"Email address is already registered."');
            } else {
              console.error("Registration failed:", error);
            }
          } else {
            console.error("Registration failed:", error);
          }
        });
    }
  }

  return (
    <section className="register">
      <div className="register-container">
        <div className="register-content">
          <h2 className="center auth-header">Create Your Account</h2>
          <p className="center auth-par">
            PLEASE ENTER YOUR INFORMATION TO SIGN UP.
          </p>
          <form onSubmit={hsn}>
            <div className="flexSb gap-2">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                id="firstname"
                value={firstname}
                onChange={(e) => setrFirstname(e.target.value)}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                id="lastname"
                className="left"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="flexSb">
              {nameError && (
                <span className="error-password-message">{nameError}</span>
              )}
              {lastNameError && (
                <span className="error-password-message">{lastNameError}</span>
              )}
            </div>
            <div className="flexSb  gap-2">
              <input
                type="file"
                name="ID"
                accept="image/*"
                id="profilePicture"
                placeholder="ID Picture"
                onChange={(e) => setID(e.target.files[0])}
                />

            
            </div>
            <div className="flexSb">
              {IDError && (
                <span className="error-password-message">{IDError}</span>
              )}
              
            </div>
            
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            {emailError && (
              <span className="error-password-message">{emailError}</span>
            )}
            <div className="flexSb password">
            <input
              type={showPassword ? "text" : "password"} 
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <FontAwesomeIcon
               icon={showPassword ? faEyeSlash : faEye} 
               className="fa-eye"
               onClick={togglePasswordVisibility}
            />
            </div>
           
            {passwordError && (
              <span className="error-password-message">{passwordError}</span>
            )}
          <div className="flexSb password">
          <input
                  type={showConfirmPassword ? "text" : "password"} 
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FontAwesomeIcon
          icon={showConfirmPassword ? faEyeSlash : faEye} // Toggle eye icon based on showConfirmPassword state
          className="fa-eye"
          onClick={toggleConfirmPasswordVisibility}
        />
          </div>
           
            {confirmPasswordError && (
              <span className="error-confirmpassword-message">
                {confirmPasswordError}
              </span>
            )}

            <div className="centering">
              <button type="submit" className="submit">
                Register
              </button>
            </div>
            <p className="parag ">
              Already a member?{" "}
              <Link to="/login" className="auth-span">
                Login
              </Link>
            </p>
            {registerError && (
              <span className="error-register-message">{registerError}</span>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
