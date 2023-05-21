import React from "react";
import LoginLayout from "../layout/LoginLayout/LoginLayout";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../assets/css/login.css'
import axios from "axios";
import Swal from "sweetalert2";
import IsLoadingComponent from "../components/IsLoadingComponent";

function NewPassScreen() {

  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  if (!localStorage.getItem('user-reset-password')) {
    return <Navigate to={'/resetpass'} />
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    setPasswordValid(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(event.target.value)
    );
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    if (password !== event.target.value) {
      console.log("Password not match");
    }
  }

  const handleSave = (event) => {
    event.preventDefault();

    // Validate password
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
      password
    );
    setShowPasswordError(!isPasswordValid);

    if (!isPasswordValid) {
      console.log("Form validation failed");
      return;
    }

    // Check if password matches confirm password
    if (password !== confirmpassword) {
      console.log("Password does not match");
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      password,
    };
    const token = JSON.parse(localStorage.getItem('user-reset-password'));
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    setIsLoading(true);
    axios.put('/users/password-reset/', formData, config).then((resolve) => {
      if (resolve.data.status === "success") {
        Swal.fire({
          title: 'Success.',
          text: resolve.data.message,
          icon: 'success',
          confirmButtonText: 'Ok!'
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem('user-reset-password');
            navigate('/login');
          }
        });
      } else {
        Swal.fire({
          title: 'Failed!',
          text: resolve.data.message,
          icon: 'error',
          confirmButtonText: 'Try'
        })
      }
    }).catch((rejects) => {
      console.log('rejects: ', rejects.message);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const handleCancel = () => {
    setPassword("");
    localStorage.removeItem('user-reset-password');
    navigate('/login');
  };

  const messagepass1 = `Password must be at least 8 characters long`
  const messagepass2 = ` and contain at least 1 uppercase letter, `
  const messagepass3 = ` 1 lowercase letter, and 1 number.`

  return (
    <LoginLayout>
      {isLoading && <IsLoadingComponent />}
      <form action="" className="form-reset" onSubmit={handleSubmit}>
        <div className="reset-text">
          <h2 style={{ fontWeight: "bold" }}>Set New Password</h2>
        </div>

        <div className="reset-text">
          <label htmlFor="newpass">New Password</label>
          <input
            type="password"
            name="password"
            placeholder=""
            className="input-regis"
            style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
            onChange={handleChangePassword}
          />
          {!isPasswordValid && (
            <div
              className=" position-absolute alert alert-danger translate-middle badge border border-light p-2"
              style={{
                left: "-47%",
                top: "35%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {messagepass1}
              <br />
              {messagepass2}
              <br />
              {messagepass3}
            </div>
          )}
        </div>

        <div className="reset-text">
          <label htmlFor="confirmpass">Comfirm Password</label>
          <input
            type="password"
            name="confirmpass"
            placeholder=""
            className="input-regis"
            style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
            onChange={handleChangeConfirmPassword}
          />
          {password !== confirmpassword && (
            <div
              className="position-absolute alert alert-danger translate-middle badge border border-light p-2"
              style={{
                left: "-27.5%",
                top: "53%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Passwords do not match
            </div>
          )}
        </div>

        <div className="btn-regis">
          <div>
            <button
              className="btn-save-regis" type="submit"
              style={{ marginRight: "26px", fontWeight: "bold" }}
            // onClick={handleSave}
            >
              Reset Password
            </button>
          </div>

          <div>
            <Link to="/login">
              <button
                className="btn-cancel-regis"
                style={{ fontWeight: "bold" }}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </LoginLayout>
  );
}

export default NewPassScreen