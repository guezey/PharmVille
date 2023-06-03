import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
} from "mdb-react-ui-kit";
import "./Login.css";

function Register({ onBackToLogin }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tcKimlikNo, setTcKimlikNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Patient");
  const [degreeFile, setDegreeFile] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const FormSelect = ({
    wrapperClass,
    label,
    id,
    value,
    onChange,
    options,
  }) => {
    return (
      <div className={wrapperClass}>
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <select
          className="form-select"
          id={id}
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const FormFileInput = ({ wrapperClass, label, id, onChange, fileName }) => {
    return (
      <div className={wrapperClass}>
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <div className="input-group">
          <input
            type="file"
            className="form-control"
            id={id}
            onChange={onChange}
            style={{ display: "none" }}
          />
          <input
            type="text"
            className="form-control"
            readOnly
            value={fileName}
            placeholder="No file chosen"
            onClick={() => document.getElementById(id).click()}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => document.getElementById(id).click()}
            style={{ backgroundColor: "#1E2D2F" }}
          >
            Browse
          </button>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !surname ||
      !tcKimlikNo ||
      !email ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!/^\d+$/.test(tcKimlikNo)) {
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

    if (role === "Doctor" && !degreeFile) {
      setErrorMessage("Please upload your medicine degree for review.");
      return;
    }

    if (role === "Pharmacy" && !licenseFile) {
      setErrorMessage("Please upload your pharmacy license for review.");
      return;
    }

    // Clear error message if form is valid
    setErrorMessage("");

    // Replace with your own backend server URL
    const apiUrl = "http://your-backend-server.com/api/register";

    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("tcKimlikNo", tcKimlikNo);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    if (degreeFile) {
      formData.append("degreeFile", degreeFile);
    }

    if (licenseFile) {
      formData.append("licenseFile", licenseFile);
    }

    try {
      await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Registration successful, navigate to login
      onBackToLogin();
    } catch (error) {
      // Handle errors while storing data in the database
      setErrorMessage("An error occurred while registering. Please try again.");
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setDegreeFile(null);
    setLicenseFile(null);
  };

  const handleDegreeFileChange = (e) => {
    setDegreeFile(e.target.files[0]);
  };

  const handleLicenseFileChange = (e) => {
    setLicenseFile(e.target.files[0]);
  };

  return (
    <div>
      <h1 className="logInFont">Register</h1>
      <MDBContainer className="p-3 my-5 d-flex flex-column logInHolder">
        <form onSubmit={handleSubmit}>
          <FormSelect
            wrapperClass="mb-4"
            label="Role"
            id="formRole"
            value={role}
            onChange={handleRoleChange}
            options={[
              { value: "Patient", label: "Patient" },
              { value: "Doctor", label: "Doctor" },
              { value: "Pharmacy", label: "Pharmacy" },
            ]}
          />
          {role === "Doctor" && (
            <FormFileInput
              wrapperClass="mb-4"
              label="Upload Medicine Degree"
              id="formDegreeFile"
              onChange={handleDegreeFileChange}
              fileName={degreeFile && degreeFile.name}
            />
          )}
          {role === "Pharmacy" && (
            <FormFileInput
              wrapperClass="mb-4"
              label="Upload Pharmacy License"
              id="formLicenseFile"
              onChange={handleLicenseFileChange}
              fileName={licenseFile && licenseFile.name}
            />
          )}
          {role !== "Pharmacy" && (
          <div className="mb-4">
            <label htmlFor="formName" className="form-label">
              Name
            </label>
            <input
              className="form-control"
              id="formName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          )}
          {role !== "Pharmacy" && (
          <div className="mb-4">
            <label htmlFor="formSurname" className="form-label">
              Surname
            </label>
            <input
              className="form-control"
              id="formSurname"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          )}
          {role !== "Pharmacy" && (
          <div className="mb-4">
            <label htmlFor="formTCKimlikNo" className="form-label">
              TC Kimlik No
            </label>
            <input
              className="form-control"
              id="formTCKimlikNo"
              type="text"
              maxLength="11"
              value={tcKimlikNo}
              onChange={(e) => setTcKimlikNo(e.target.value)}
            />
          </div>
          )}
          <div className="mb-4">
            <label htmlFor="formEmail" className="form-label">
              Email address
            </label>
            <input
              className="form-control"
              id="formEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="formPassword" className="form-label">
              Password
            </label>
            <input
              className="form-control"
              id="formPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="formConfirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              className="form-control"
              id="formConfirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
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

function Login({onLogin}) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  if (isRegistering) {
    return <Register onBackToLogin={() => setIsRegistering(false)} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace with your own backend server URL
    const apiUrl = "http://localhost:5000/login";

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post(apiUrl, data);
      const userRole = response.data.role;
      const userData = response.data;

      if (userRole) {
        onLogin(userRole, userData);
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("userData", JSON.stringify(userData));
        // Redirect or update the state based on userRole
      } else {
        // Handle invalid user role from the server
        setLoginErrorMessage("Invalid user role received from server.");
      }
    } catch (error) {
      // Handle errors while sending data to the server
      setLoginErrorMessage(
        "An error occurred while logging in. Please try again."
      );
    }

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(false);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the forgot password process here
    console.log("Forgot password email:", email);
  };

  const handleRegister = () => {
    setIsRegistering(true);
  };

  if (isForgotPassword) {
    return (
      <div>
        <h1 className="logInFont">Forgot Password</h1>
        <MDBContainer className="p-3 my-5 d-flex flex-column logInHolder">
          <form onSubmit={handleForgotPasswordSubmit}>
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="mb-4 logInButton">
              Submit
            </button>
          </form>
          <div className="text-center">
            <p style={{ color: "#1E2D2F" }}>
              Back to{" "}
              <a href="#!" onClick={handleBackToLogin}>
                Login
              </a>
            </p>
          </div>
        </MDBContainer>
      </div>
    );
  }

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
      {loginErrorMessage && (
        <p className="error-message mt-4">{loginErrorMessage}</p>
      )}
    </div>
  );
}

export default Login;
