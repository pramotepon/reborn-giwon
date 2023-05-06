import React from "react";
import LoginLayout from "../layout/loginlayout/loginlay";
import { Link } from "react-router-dom";

function ResetPassScreen() {
    return (
      <LoginLayout>
        <form action="" className="form-reset">
          <div className="reset-text">
            <h2>Reset Password</h2>
          </div>

          <div className="reset-text" >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder=""
              className="input-regis"
            />
          </div>
          <div className="hw-reset">
            <div className="reset-text">
              <label htmlFor="Height">
                Height
              </label>
              <input
                type="text"
                name="Height"
                placeholder=""
                className="input-regis weight-regis"
              />
            </div>
            <div className="reset-text">
              <label htmlFor="CurrentWeight">
                Current Weight
              </label>
              <input
                type="text"
                name="Weight"
                placeholder=""
                className="input-regis weight-regis"
              />
            </div>
          </div>
          <div className="reset-text" style={{ fontSize : "18px",display: 'flex', flexDirection: 'row' }}>
            <label htmlFor="gender">Gender</label>
            <input type="radio" name="gender" />
            Male
            <input type="radio" name="gender" />
            Female
            <input type="radio" name="gender" />
            Prefer not to say
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

export default ResetPassScreen