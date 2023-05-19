import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../assets/css/login.css";
import LoginLayout from "../layout/LoginLayout/LoginLayout";
import IsLoadingComponent from "../components/IsLoadingComponent";
import { UserContext } from "../contexts/UserContext";

function RegisterScreen() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [displayName, setDisplayname] = useState();
	const [height, setHeight] = useState();
	const [weight, setWeight] = useState();
	const [gender, setGender] = useState();
	const [image, setImage] = useState();
	const [imageType, setImageType] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const { user } = useContext(UserContext);

	if (user) {
		return <Navigate to={'/dashboard'} />
	}

	const handleChangeEmail = (event) => {
		setEmail(event.target.value);
		console.log(email);
	};
	const handleChangePassword = (event) => {
		setPassword(event.target.value);
		console.log(password);
	};
	const handleChangeDisplayname = (event) => {
		setDisplayname(event.target.value);
		console.log(displayName);
	};
	const handleChangeHeight = (event) => {
		setHeight(event.target.value);
		console.log(height);
	};
	const handleChangeWeight = (event) => {
		setWeight(event.target.value);
		console.log(weight);
	};
	const handleChangeGender = (event) => {
		setGender(event.target.value);
		console.log(gender);
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
		const formData = {
			email,
			password,
			displayName,
			height,
			weight,
			gender,
			image,
			imageType,
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

	// useEffect(() => { }, [gender]);

	return (
		<LoginLayout>
			{isLoading && <IsLoadingComponent />}
			<form
				action=""
				className="form-login form-regis"
				encType="multipart/form-data"
			>
				{/* {isLoading && <IsLoadingComponent />} */}
				{/* <IsLoadingComponent /> */}
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
						style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", fontWeight: "bold" }}
						onChange={handleChangeEmail}
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
						style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
						onChange={handleChangePassword}
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
						style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", fontWeight: "bold"  }}
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
							style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", fontWeight: "bold"  }}
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
							style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", fontWeight: "bold"  }}
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
			</form>
		</LoginLayout>
	);
}

export default RegisterScreen;
