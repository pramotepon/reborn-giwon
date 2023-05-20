import React, { useContext } from "react";
import LoginLayout from "../layout/LoginLayout/LoginLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../assets/css/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import IsLoadingComponent from "../components/IsLoadingComponent";
import Swal from "sweetalert2";
import verifyToken from "../utils/verifyToken";

function EditProfileScreen() {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  function goBack(e) {
    e.preventDefault();
    navigate(-1);
  }

  const [displayName, setDisplayname] = useState(user?.displayName || "");
  const [height, setHeight] = useState(user?.height || "");
  const [weight, setWeight] = useState(user?.weight || "");
  const [gender, setGender] = useState(user?.gender || "male");
  const [image, setImage] = useState();
  const [imageType, setImageType] = useState();
  const [isDisplayNameValid, setDisplayNameValid] = useState(true);
	const [isHeightValid, setHeightValid] = useState(true);
	const [isWeightValid, setWeightValid] = useState(true);
  let extImage;
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeDisplayname = (event) => {
    setDisplayname(event.target.value);
    setDisplayNameValid(event.target.value.length != 0);
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

  const updateUser = () => {
    const { token } = JSON.parse(localStorage.getItem('user'))
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    if (imageType) {
      extImage = imageType.split('.').pop();
    } else {
      extImage = imageType;
    }
    const bodyParams = {
      displayName,
      height,
      weight,
      gender,
      image,
      extImage
    }
    axios.put(`/users/edit-profile/${user._id}`, bodyParams).then(({ data }) => {
      Swal.fire({
        title: 'Success.',
        text: data,
        icon: 'success',
        confirmButtonText: 'Ok!'
      }).then((result) => {
        if (result.isConfirmed) {
          const data = verifyToken(token);
          setUser(data);
          navigate(-1)
        }
      });
    }).catch((error) => {
      console.log(error);
      Swal.fire({
        title: 'Failed!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Try'
      })
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const handleSave = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Do you want to save the changes?',
      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setIsLoading(true);
        updateUser();
      }
    })

    // Validate displayName
		const isDisplayNameValid = displayName.length <= 11;
		setDisplayNameValid(isDisplayNameValid);

		if (!isDisplayNameValid) {
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
  };

  return (
    <LoginLayout>
      {isLoading && <IsLoadingComponent />}
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
            style={{ fontWeight: "bold" }}
            value={displayName} maxLength={11}
            onChange={handleChangeDisplayname}
          />
          {!isDisplayNameValid && (
							<div className=" position-absolute alert alert-danger translate-middle badge border border-light p-2"
								style={{ left: "-45%", top: "36%", transform: "translate(-50%, -50%)" }}>Display name must be a maximum of 11 characters</div>
						)}
        </div>

        <div
          className="hw"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            className="regis-text"
            style={{ marginBottom: "10px", width: "145px" }}
          >
            <label htmlFor="password" style={{ display: "flex" }}>
              Height
            </label>
            <input
              type="text"
              name="Height"
              placeholder=""
              className="input-regis"
              value={height}
              style={{ fontWeight: "bold" }}
              onChange={handleChangeHeight}
            />
            {!isHeightValid && (
								<div className=" position-absolute alert alert-danger translate-middle badge border border-light p-2"
									style={{ left: "-57%", top: "45%", transform: "translate(-50%, -50%)" }}>Height must be a numeric value with a maximum of 4 characters</div>
							)}
          </div>

          <div
            className="regis-text"
            style={{ marginBottom: "10px", width: "47%" }}
          >
            <label htmlFor="password" style={{ display: "flex" }}>
              Weight
            </label>
            <input
              type="text"
              name="Weight"
              placeholder=""
              className="input-regis weight-regis"
              value={weight}
              style={{ fontWeight: "bold" }}
              onChange={handleChangeWeight}
            />
            {!isWeightValid && (
								<div className=" position-absolute alert alert-danger translate-middle badge border border-light p-2"
									style={{ left: "-57.5%", top: "50%", transform: "translate(-50%, -50%)" }}>Weight must be a numeric value with a maximum of 4 characters</div>
							)}
          </div>
        </div>

        <div className="regis-text" style={{ fontSize: "18px" }}>
          <label htmlFor="gender">Gender</label>
          <input type="radio" name="gender" style={{ marginLeft: "5px" }} onChange={handleChangeGender} value={'male'} checked={gender === "male"} />
          Male
          <input type="radio" name="gender" style={{ marginLeft: "5px" }} onChange={handleChangeGender} value={'female'} checked={gender === "female"} />
          Female
          <input type="radio" name="gender" style={{ marginLeft: "5px" }} onChange={handleChangeGender} value={'prefer not to say'} checked={gender === "prefer not to say"} />
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
              onClick={(e) => handleSave(e)}
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

export default EditProfileScreen;
