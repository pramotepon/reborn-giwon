import React from "react";
import LoginLayout from "../layout/loginlayout/loginlay";
import { Link } from "react-router-dom";

function LoginScreen() {
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
        />
      </div>
      <div>
        <p>Plaese fill a password</p>
      </div>
      <div>
        <button className="btn-login">Login</button>
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