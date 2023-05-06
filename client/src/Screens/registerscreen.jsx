import React from "react";
import LoginLayout from "../layout/loginlayout/loginlay";
import { Link } from "react-router-dom";

function RegisterScreen() {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleChangeUserName = (event) => {
      setUsername(event.target.value);
  };
  const handleChangePassword = (event) => {
      setPassword(event.target.value);
  };
  
    return (
      <LoginLayout>
        <form action="" className="form-login form-regis">
          <div className="regis-text-top" style={{ marginBottom: "10px" }}>
            <h2>Register</h2>
          </div>

          <div className="regis-text" style={{ marginBottom: "10px" }}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder=""
              className="input-regis"
              style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
            />
          </div>
          <div className="regis-text" style={{ marginBottom: "10px" }}>
            <label htmlFor="password" style={{ display: "flex" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder=""
              className="input-regis"
              style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
            />
          </div>
          <div className="regis-text" style={{ marginBottom: "10px" }}>
            <label htmlFor="password" style={{ display: "flex" }}>
              DisplayName
            </label>
            <input
              type="text"
              name="DisplayName"
              placeholder=""
              className="input-regis"
              style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
            />
          </div>
          <div className="hw">
            <div className="regis-text" style={{ marginBottom: "10px" }}>
              <label htmlFor="password" style={{ display: "flex" }}>
                Height
              </label>
              <input
                type="text"
                name="Height"
                placeholder=""
                className="input-regis"
                style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
              />
            </div>
            <div className="regis-text" style={{ marginBottom: "10px" }}>
              <label htmlFor="password" style={{ display: "flex" }}>
                Weight
              </label>
              <input
                type="text"
                name="Weight"
                placeholder=""
                className="input-regis weight-regis"
                style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
              />
            </div>
          </div>
          <div className="regis-text" style={{ fontSize : "18px" }}>
            <label htmlFor="gender">Gender</label>
            <input type="radio" name="gender" />
            Male
            <input type="radio" name="gender" />
            Female
            <input type="radio" name="gender" />
            Prefer not to say
          </div>
          <div style={{ marginTop: "10px" }}>
            <input
              type="file"
              name="file"
              placeholder="img"
              accept="image/*"
              id="file-regis"
            />
            <label htmlFor="file-regis" id="file-regis">
              Upload Image File
            </label>
          </div>
          <div className="btn-regis">
            <div>
              <button
                className="btn-save-regis"
                style={{ marginRight: "26px" }}
              >
                Save
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

export default RegisterScreen