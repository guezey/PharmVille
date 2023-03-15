import React from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./Login.css";
function Login() {
  return (
    <div>
      <h1 className="logInFont">Login</h1>
    <MDBContainer className="p-3 my-5 d-flex flex-column logInHolder">
      
      <MDBInput
        wrapperClass="mb-4"
        label="Email address"
        id="form1"
        type="email"
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="form2"
        type="password"
      />

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox
          name="flexCheck"
          value=""
          id="flexCheckDefault"
          label="Remember me"
        />
        <a href="!#">Forgot password?</a>
      </div>

      <button className="mb-4 logInButton">Sign in</button>

      <div className="text-center">
        <p style={{color: "#1E2D2F"}}>
          Not a member? <a href="#!">Register</a>
        </p>
      </div>
    </MDBContainer>
    </div>
  );
}

export default Login;
