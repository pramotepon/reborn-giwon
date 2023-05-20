import React from "react";
import LoginLayout from "../layout/LoginLayout/LoginLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../assets/css/login.css";

function ResetPassScreen() {
  const [email, setEmail] = useState();
  const [height, setHeight] = useState();
  const [currentweight, setcurrentWeight] = useState();
  const [gender, setGender] = useState("male");

  const [isEmailValid, setEmailValid] = useState(true);
  const [isHeightValid, setHeightValid] = useState(true);
  const [isWeightValid, setWeightValid] = useState(true);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value);
    setEmailValid(/\S+@\S+\.\S+/.test(event.target.value));
  };
  const handleChangeHeight = (event) => {
    setHeight(event.target.value);
    setHeightValid(/^\d{1,4}$/.test(event.target.value));
  };
  const handleChangeCurrentWeight = (event) => {
    setcurrentWeight(event.target.value);
    setWeightValid(/^\d{1,4}$/.test(event.target.value));
  };
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleSave = (event) => {
    event.preventDefault();

    // Validate email
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    setShowEmailError(!isEmailValid);

    if (!isEmailValid) {
      console.log("Form validation failed");
      return;
    }

    // Validate height
    const isHeightValid = /^\d{1,4}$/.test(height);
    setHeightValid(isHeightValid);

    if (!isHeightValid) {
      console.log("Form validation failed");
      return;
    }

    // Validate weight
    const isWeightValid = /^\d{1,4}$/.test(weight);
    setWeightValid(isWeightValid);

    if (!isWeightValid) {
      console.log("Form validation failed");
      return;
    }

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

        <div className="reset-text">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder=""
            className="input-regis"
            style={{ fontWeight: "bold" }}
            onChange={handleChangeEmail}
          />
          {!isEmailValid && (
            <div className="position-absolute alert alert-danger translate-middle badge border border-light p-2" 
			style={{ left: "-22%",top:"36%", transform: "translate(-50%, -50%)" }}>Email must be valid</div>
          )}
        </div>

        <div
          className="hw-reset"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <div className="reset-text" style={{ flexBasis: "45%" }}>
            <label htmlFor="Height">Height</label>
            <input
              type="text"
              name="Height"
              placeholder=""
              className="input-regis weight-regis"
              style={{ fontWeight: "bold" }}
              onChange={handleChangeHeight}
            />
            	{!isHeightValid && (
            <div className=" position-absolute alert alert-danger translate-middle badge border border-light p-2"
			style={{ left: "-67.5%",top:"50%", transform: "translate(-50%, -50%)" }}>Height must be a numeric value with a maximum of 4 characters</div>
          )}
          </div>

          <div className="reset-text" style={{ flexBasis: "45%" }}>
            <label htmlFor="CurrentWeight">Current Weight</label>
            <input
              type="text"
              name="Weight"
              placeholder=""
              className="input-regis weight-regis"
              style={{ fontWeight: "bold" }}
              onChange={handleChangeCurrentWeight}
            />
            {!isWeightValid && (
            <div className=" position-absolute alert alert-danger translate-middle badge border border-light p-2"
			style={{ left: "-67.5%",top:"55%", transform: "translate(-50%, -50%)" }}>Weight must be a numeric value with a maximum of 4 characters</div>
          )}
          </div>
        </div>

        <div
          className="reset-text"
          style={{ fontSize: "18px", display: "flex", flexDirection: "row" }}
        >
          <label htmlFor="gender">Gender</label>
          <input type="radio" name="gender" onChange={handleChangeGender} />
          Male
          <input type="radio" name="gender" onChange={handleChangeGender} />
          Female
          <input type="radio" name="gender" onChange={handleChangeGender} />
          Prefer not to say
        </div>

        <div className="btn-regis">
          <div>
            <Link to="/login">
              <button
                className="btn-save-regis"
                style={{ marginRight: "26px", fontWeight: "bold" }}
                // onClick={handleSave}
              >
                Set New Password
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

export default ResetPassScreen;
