import React from "react";
import LoginLayout from "../layout/loginlayout/loginlay";
import { Link } from "react-router-dom";

function NewPassScreen() {
    return (
      <LoginLayout>
        <form action="" className="form-reset">
          <div className="reset-text">
            <h2>Set New Password</h2>
          </div>

          <div className="reset-text" >
            <label htmlFor="newpass">New Password</label>
            <input
              type="password"
              name="email"
              placeholder=""
              className="input-regis"
              style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
            />
          </div>

          <div className="reset-text" >
            <label htmlFor="confirmpass">Comfirm Password</label>
            <input
              type="password"
              name="email"
              placeholder=""
              className="input-regis"
              style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
            />
          </div>

          <div className="btn-regis">
            <div>
              <button
                className="btn-save-regis"
                style={{ marginRight: "26px" }}
              >
                Reset Password
              </button>
            </div>
            <div>
              <button className="btn-cancel-regis">Cancel</button>
            </div>
          </div>
        </form>
      </LoginLayout>
    );
}

export default NewPassScreen