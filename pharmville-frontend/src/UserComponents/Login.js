import React, { useState } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./Login.css";

function Register({ onBackToLogin }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tcKimlikNo, setTcKimlikNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !surname ||
      !tcKimlikNo ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    if(!/^\d+$/.test(tcKimlikNo)) {
      setErrorMessage("TC Kimlik No must only contain numbers.");
      return;
    }

    if (tcKimlikNo.length !== 11) {
      setErrorMessage("TC Kimlik No must be exactly 11 digits.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Clear error message if form is valid
    setErrorMessage("");

    // Replace with your own backend server URL
    const apiUrl = "https://your-backend-server.com/api/register";

    const data = {
      name,
      surname,
      tcKimlikNo,
      email,
      password,
    };

    try {
      await axios.post(apiUrl, data);
      // Registration successful, navigate to login
      onBackToLogin();
    } catch (error) {
      // Handle errors while storing data in the database
      setErrorMessage("An error occurred while registering. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="logInFont">Register</h1>
      <MDBContainer className="p-3 my-5 d-flex flex-column logInHolder">
        <form onSubmit={handleSubmit}>
          <MDBInput
            wrapperClass="mb-4"
            label="Name"
            id="formName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Surname"
            id="formSurname"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="TC Kimlik No"
            id="formTCKimlikNo"
            type="text"
            maxLength="11"
            value={tcKimlikNo}
            onChange={(e) => setTcKimlikNo(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="formEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="formPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Confirm Password"
            id="formConfirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className="mb-4 logInButton">
            Register
          </button>
        </form>

        {errorMessage && <p className="error-message mt-4">{errorMessage}</p>}

        <div className="text-center">
          <p style={{ color: "#1E2D2F" }}>
            Already a member?{" "}
            <a href="#!" onClick={onBackToLogin}>
              Login
            </a>
          </p>
        </div>
      </MDBContainer>
    </div>
  );
}

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  if (isRegistering) {
    return <Register onBackToLogin={() => setIsRegistering(false)} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the login process here
    console.log(email, password, rememberMe);
  };

  const handleForgotPassword = () => {
    // Add your logic to handle the forgot password process here
    console.log("Forgot password clicked");
  };

  const handleRegister = () => {
    setIsRegistering(true);
  };

  return (
    <div>
      <h1 className="logInFont">Login</h1>
      <MDBContainer className="p-3 my-5 d-flex flex-column logInHolder">
        <form onSubmit={handleSubmit}>
          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="form1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="d-flex justify-content-between mx-3 mb-4">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <a href="#!" onClick={handleForgotPassword}>
              Forgot password?
            </a>
          </div>

          <button type="submit" className="mb-4 logInButton">
            Sign in
          </button>
        </form>

        <div className="text-center">
          <p style={{ color: "#1E2D2F" }}>
            Not a member?{" "}
            <a href="#!" onClick={handleRegister}>
              Register
            </a>
          </p>
        </div>
      </MDBContainer>
    </div>
  );
}

export default Login;
