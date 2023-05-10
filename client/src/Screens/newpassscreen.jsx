import React from "react";
import LoginLayout from "../layout/loginlayout/loginlay";
import { Link } from "react-router-dom";
import { useState } from "react";
import '../assets/css/login.css'

function NewPassScreen() {

  const [password, setPassword] = useState();

  const handleChangePassword = (event) => {
      setPassword(event.target.value);
  };

  const handleSave = (event) => {
    event.preventDefault(); 
  
    const formData = {
      password,
    };
  
    console.log(formData);
  
  };

  const handleCancel = () => {
    setPassword("");
  };

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
              name="email"
              placeholder=""
              className="input-regis"
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
              onChange={handleChangePassword}
            />
          </div>

          <div className="reset-text">
            <label htmlFor="confirmpass">Comfirm Password</label>
            <input
              type="password"
              name="email"
              placeholder=""
              className="input-regis"
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
              onChange={handleChangePassword}
            />
          </div>

          <div className="btn-regis">
            <div>
              <button
                className="btn-save-regis"
                style={{ marginRight: "26px", fontWeight: "bold" }}
                onClick={handleSave}
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