import React from "react";
import LoginLayout from "../layout/loginlayout/loginlay";
import { Link } from "react-router-dom";
import { useState } from "react";
import '../assets/css/login.css'
import { useNavigate } from 'react-router-dom';


function EditProfileScreen( props ) {
  console.log(props.location);
  const navigate = useNavigate();

  function goBack(e) {
    e.preventDefault(); 
    navigate(-1);
  }

  const [displayname, setDisplayname] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [gender, setGender] = useState();
  const [image, setImage] = useState();

  const handleChangeDisplayname = (event) => {
      setDisplayname(event.target.value);
  };
  const handleChangeHeight = (event) => {
      setHeight(event.target.value);
  };
  const handleChangeWeight = (event) => {
      setWeight(event.target.value);
  };
  const handleChangeGender = (event) => {
      setGender(event.target.value);
  };
  const handleChangeImage = (event) => {
      setImage(event.target.value);
  };

  // const handleSave = (event) => {
  //   event.preventDefault(); 
  
  //   const formData = {
  //     displayname,
  //     height,
  //     weight,
  //     gender,
  //     image,
  //   };
  
  //   console.log(formData);
  
  // };

  // const handleCancel = () => {
  //   setDisplayname("");
  //   setHeight("");
  //   setWeight("");
  //   setGender("");
  //   setImage("");
  // };

    return (
      <LoginLayout>
        <form action="" className="form-login form-regis">
          <div className="regis-text-top" style={{ marginBottom: "10px" }}>
            <h2 style={{ fontWeight: "bold" }}>Edit Profile</h2>
          </div>

          <div className="regis-text" style={{ marginBottom: "10px" }}></div>
          <div className="regis-text" style={{ marginBottom: "10px" }}></div>
          <div className="regis-text" style={{ marginBottom: "10px" }}>
            <label htmlFor="password" style={{ display: "flex" }}>
              DisplayName
            </label>
            <input
              type="text"
              name="DisplayName"
              placeholder=""
              className="input-regis"
              onChange={handleChangeDisplayname}
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
                onChange={handleChangeHeight}
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
                onChange={handleChangeWeight}
              />
            </div>
          </div>
          <div className="regis-text" style={{ fontSize: "18px" }}>
            <label htmlFor="gender">Gender</label>
            <input type="radio" name="gender" onChange={handleChangeGender} />
            Male
            <input type="radio" name="gender" onChange={handleChangeGender} />
            Female
            <input type="radio" name="gender" onChange={handleChangeGender} />
            Prefer not to say
          </div>
          <div style={{ marginTop: "10px" }}>
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
                onClick={(e) => goBack(e)}
              >
                Save
              </button>
            </div>
            <div>
              <button
                className="btn-cancel-regis"
                style={{ fontWeight: "bold" }}
                onClick={(e) => goBack(e)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </LoginLayout>
    );
}

export default EditProfileScreen