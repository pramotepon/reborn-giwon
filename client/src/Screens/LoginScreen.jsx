import React, { useContext } from "react";
import LoginLayout from "../layout/LoginLayout/LoginLayout";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../assets/css/login.css'
import { UserContext } from "../contexts/UserContext";
import verifyToken from "../utils/verifyToken";
import Swal from 'sweetalert2';
import axios from 'axios';

function LoginScreen() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { user, setUser } = useContext(UserContext);

  const nav = useNavigate();

  let errMessage;

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        email: email,
        password: password
      }
      const { data } = await axios.post('/users/login', formData);
      if(data.error){
        throw new Error(JSON.stringify(data.error));
      }
      localStorage.setItem('user', JSON.stringify(data));
      const userData = await verifyToken(data.token);
      setUser(userData);
      nav('/dashboard');
    } catch (e) {
      const eMessage = JSON.parse(e.message);
      errMessage = eMessage.message;
      Swal.fire({
        title: 'Login Failed!',
        text: errMessage,
        icon: 'error',
        confirmButtonText: 'Try'
      })
    }
  };
  if (user) {
    return <Navigate to={'/dashboard'} />;
  }
  return (
    <LoginLayout>
      <form action="" className="form-login">

        <div className="login-text-top">
          <h2 style={{ fontWeight: "bold" }}>Login</h2>
        </div>

        <div className="login-text">
          <label htmlFor="email" >Email</label>
          <input
            type="email"
            name="email"
            placeholder=""
            className={`input-login ${errMessage ? "border border-danger" : ""}`}
            style={{ fontWeight: "bold" }}
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
            className={`input-login ${errMessage ? "border border-danger" : ""}`}
            onChange={handleChangePassword}
          />
        </div>

        <div>
          <p >Please fill a password</p>
        </div>

        <div>
          <button className="btn-login"
            style={{ fontWeight: "bold" }}
            onClick={handleLogin}>Login</button>
        </div>

        <div>
          <Link to="/resetpass" style={{ color: '#212F33', fontWeight: 'bold', textDecoration: 'none' }}>Forget Password?</Link>
        </div>

        <div>
          <p>
            Don't have an account? <Link to="/register" style={{ color: '#212F33', fontWeight: 'bold', textDecoration: 'none' }}>Sign up</Link>
          </p>
        </div>

      </form>
    </LoginLayout>
  );
}

export default LoginScreen