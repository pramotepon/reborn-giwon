import React from "react";
import LoginLayout from "../layout/loginlayout/loginlay";
import { Link } from "react-router-dom";
import { useState } from "react";

function ResetPassScreen() {

  const [email, setEmail] = useState();
  const [height, setHeight] = useState();
  const [currentweight, setcurrentWeight] = useState();
  const [gender, setGender] = useState();

  const handleChangeEmail = (event) => {
      setEmail(event.target.value);
      console.log(event.target.value);
  };
  const handleChangeHeight = (event) => {
      setHeight(event.target.value);
  };
  const handleChangeCurrentWeight = (event) => {
    setcurrentWeight(event.target.value);
  };
  const handleChangeGender = (event) => {
      setGender(event.target.value);
  };


  const handleSave = (event) => {
    event.preventDefault(); 
  
    const formData = {
      email,
      height,
      currentweight,
      gender,
    };
  
    console.log(formData);
  
  };

  const handleCancel = () => {
    setEmail("");
    setHeight("");
    setcurrentWeight("");
    setGender("");
  };

    return (
      <LoginLayout>
        <form action="" className="form-reset">
          <div className="reset-text">
            <h2 style={{ fontWeight: "bold" }}>Reset Password</h2>
          </div>

          <div className="reset-text" >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder=""
              className="input-regis"
              onChange={handleChangeEmail}
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
                onChange={handleChangeHeight}
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
                onChange={handleChangeCurrentWeight}
              />
            </div>
          </div>
          <div className="reset-text" style={{ fontSize : "18px",display: 'flex', flexDirection: 'row' }}>
            <label htmlFor="gender">Gender</label>
            <input type="radio" name="gender" 
              onChange={handleChangeGender}
            />
            Male
            <input type="radio" name="gender" 
              onChange={handleChangeGender}
            />
            Female
            <input type="radio" name="gender" 
              onChange={handleChangeGender}
            />
            Prefer not to say
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
              <button className="btn-cancel-regis"
              style={{ fontWeight: "bold" }}
              onClick={handleCancel} >Cancel</button>
            </div>
          </div>
        </form>
      </LoginLayout>
    );
}

export default ResetPassScreen