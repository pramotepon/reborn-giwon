import React from "react";
import LoginLayout from "../layout/loginlayout/loginlay";
import { Link } from "react-router-dom";
import { useState } from "react";

function LoginScreen() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleChangeEmail = (event) => {
      setEmail(event.target.value);
      console.log(event.target.value);
  };
  const handleChangePassword = (event) => {
      setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault(); 
  
    const formData = {
      email,
      password,
    };
  
    console.log(formData);
  
  };

    return (
  <LoginLayout>
    <form action="" className="form-login">
      <div className="login-text-top">
        <h2>Login</h2>
      </div>

      <div className="login-text">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder=""
          className="input-login"
          onChange={handleChangeEmail}
        />
      </div>
      <div className="login-text">
        <label htmlFor="password" style={{ display: "flex" }}>
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder=""
          className="input-login"
          onChange={handleChangePassword}
        />
      </div>
      <div>
        <p>Please fill a password</p>
      </div>
      <div>
        <button className="btn-login"
        onClick={handleLogin}>Login</button>
      </div>
      <div>
        <p>Forget Password?</p>
      </div>
      <div>
        <p>
          Don't hava an account? <b>Sign up</b>
        </p>
      </div>
    </form>
  </LoginLayout>
    );
}

export default LoginScreen