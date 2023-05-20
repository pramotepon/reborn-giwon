import React from "react";
import LoginLayout from "../layout/LoginLayout/LoginLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import '../assets/css/login.css'

function NewPassScreen() {

  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [isPasswordValid, setPasswordValid] = useState(true);

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

    const formData = {
      password,
    };

    console.log(formData);
  };

  const handleCancel = () => {
    setPassword("");
  };

  const messagepass1 = `Password must be at least 8 characters long`
  const messagepass2 = ` and contain at least 1 uppercase letter, `
  const messagepass3 = ` 1 lowercase letter, and 1 number.`

    return (
      <LoginLayout>
        <form action="" className="form-reset">
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
              <Link to="/login">
                <button
                  className="btn-save-regis"
                  style={{ marginRight: "26px", fontWeight: "bold" }}
                  // onClick={handleSave}
                >
                  Reset Password
                </button>
              </Link>
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