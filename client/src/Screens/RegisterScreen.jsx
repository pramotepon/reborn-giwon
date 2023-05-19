import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../assets/css/login.css";
import LoginLayout from "../layout/LoginLayout/LoginLayout";
import IsLoadingComponent from "../components/IsLoadingComponent";
import { UserContext } from "../contexts/UserContext";

function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayname] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [imageType, setImageType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isEmailValid, setEmailValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isDisplayNameValid, setDisplayNameValid] = useState(true);
  const [isHeightValid, setHeightValid] = useState(true);
  const [isWeightValid, setWeightValid] = useState(true);
  const [isGenderValid, setGenderValid] = useState(true);
  const [showEmailError, setShowEmailError] = useState(true);

  const { user } = useContext(UserContext);

  let extImage;

	if (user) {
		return <Navigate to={'/dashboard'} />
	}

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    setEmailValid(/\S+@\S+\.\S+/.test(event.target.value));
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    setPasswordValid(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(event.target.value)
    );
  };

  const handleChangeDisplayname = (event) => {
    setDisplayname(event.target.value);
    setDisplayNameValid(event.target.value.length < 11);
  };

  const handleChangeHeight = (event) => {
    setHeight(event.target.value);
    setHeightValid(/^\d{1,4}$/.test(event.target.value));
  };

  const handleChangeWeight = (event) => {
    setWeight(event.target.value);
    setWeightValid(/^\d{1,4}$/.test(event.target.value));
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
    setGenderValid(event.target.value !== "");
  };

  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    setImageType(file.name);
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

	const handleSave = async (event) => {
		event.preventDefault();
		setIsLoading(true);
    if (imageType) {
			extImage = imageType.split('.').pop();
		  } else {
			extImage = imageType;
		  }
		const formData = {
			email,
			password,
			displayName,
			height,
			weight,
			gender,
			image,
      extImage
		};
		// http://127.0.0.1:8080/users/register
		const userData = await axios.post(
			"/users/register",
			formData
		);
		setIsLoading(false);
	};

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setDisplayname("");
    setHeight("");
    setWeight("");
    setGender("");
    setImage("");
    setImageType("");
  };

  const messagepass1 = `Password must be at least 8 characters long`
  const messagepass2 = ` and contain at least 1 uppercase letter, `
  const messagepass3 = ` 1 lowercase letter, and 1 number.`

  return (
    <LoginLayout>
      {isLoading && <IsLoadingComponent />}
	  <div className="register-screen-container">
      <form
        action=""
        className="form-login form-regis"
        encType="multipart/form-data"
      >
        <div className="regis-text-top" style={{ marginBottom: "10px" }}>
          <h2 style={{ fontWeight: "bold" }}>Register</h2>
        </div>

        <div className="regis-text" style={{ marginBottom: "10px" }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder=""
            className="input-regis"
            style={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              fontWeight: "bold",
            }}
            onChange={handleChangeEmail}
          />
		  {!isEmailValid && (
            <div className="col-md-5 position-absolute alert alert-danger translate-middle badge border border-light p-2" 
			style={{ left: "-40%", transform: "translate(-50%, -50%)" }}>Email must be valid</div>
          )}
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
            style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
            onChange={handleChangePassword}
          />
		  {!isPasswordValid && (
            <div className=" position-absolute alert alert-danger translate-middle badge border border-light p-2"
			style={{ left: "-40%", transform: "translate(-50%, -50%)" }}>{messagepass1}<br />{messagepass2}<br />{messagepass3}</div>
          )}
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
            style={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              fontWeight: "bold",
            }}
            onChange={handleChangeDisplayname}
          />
        </div>

        <div
          className="hw"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            className="regis-text"
            style={{ marginBottom: "10px", width: "145px" }}
          >
            <label htmlFor="height" style={{ display: "flex" }}>
              Height
            </label>
            <input
              type="text"
              name="Height"
              placeholder=""
              className="input-regis"
              style={{
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                fontWeight: "bold",
              }}
              onChange={handleChangeHeight}
            />
          </div>

          <div
            className="regis-text"
            style={{ marginBottom: "10px", width: "47%" }}
          >
            <label htmlFor="weight" style={{ display: "flex" }}>
              Weight
            </label>
            <input
              type="text"
              name="Weight"
              placeholder=""
              className="input-regis weight-regis"
              style={{
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                fontWeight: "bold",
              }}
              onChange={handleChangeWeight}
            />
          </div>
        </div>
        <div
          className="regis-text"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "18px",
          }}
        >
          <label htmlFor="gender">Gender</label>
          <input
            type="radio"
            name="gender"
            style={{ marginLeft: "5px" }}
            value="male"
            checked={gender === "male"}
            onChange={handleChangeGender}
          />
          <span style={{ whiteSpace: "nowrap" }}>Male</span>
          <input
            type="radio"
            name="gender"
            style={{ marginLeft: "5px" }}
            value="female"
            checked={gender === "female"}
            onChange={handleChangeGender}
          />
          <span style={{ whiteSpace: "nowrap" }}>Female</span>
          <input
            type="radio"
            name="gender"
            style={{ marginLeft: "5px" }}
            value="prefer not to say"
            checked={gender === "prefer not to say"}
            onChange={handleChangeGender}
          />
          <span style={{ whiteSpace: "nowrap" }}>Prefer not to say</span>
        </div>

        <div>
          <input
            type="file"
            name="file"
            placeholder="img"
            accept="image/*"
            id="file-regis"
            onChange={handleChangeImage}
          />
          <label htmlFor="file-regis" id="file-regis">
            Upload Image File
          </label>
        </div>

        <div className="btn-regis">
          <div>
            <button
              className="btn-save-regis"
              style={{ marginRight: "26px", fontWeight: "bold" }}
              onClick={handleSave}
            >
              Save
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

		{/* <div style={{marginTop:35, backgroundColor:"#415B63"}}>

		  <div>
		{!isEmailValid && (
            <span style={{ color: "red" }}>Email must be valid</span>
          )}
		  </div>

		  <div>
		{!isPasswordValid && (
            <span style={{ color: "red" }}>{messagepass}</span>
          )}
		  </div>

		</div> */}

      </form>
	  {/* <div className="error-message-container">
          {!isEmailValid && (
            <div className="error-msg alert alert-danger d-flex align-items-center">Email must be valid</div>
          )}

          {!isPasswordValid && (
            <div className="error-msg">Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.</div>
          )}
        </div> */}
		</div>
    </LoginLayout>
  );
}

export default RegisterScreen;