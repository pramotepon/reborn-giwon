import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Alert } from "bootstrap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../assets/css/components/CRUD.css";
import { UserContext } from "../contexts/UserContext";
import IsLoadingComponent from "./IsLoadingComponent";

const CrudCreate = () => {

	const { user } = useContext(UserContext);

	const [name, setName] = useState("");
	const [type, setType] = useState("run");
	const [date, setDate] = useState("");
	const [weight, setWeight] = useState(0);
	const [text, setText] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	const [showValidationMessage, setShowValidationMessage] = useState(false); // New state variable
	const [hours, setHours] = useState(0); // Changed duration state to hours
	const [minutes, setMinutes] = useState(0); // Added minutes state

	const duration = {
		hour: hours,
		minute: minutes,
	};

	const [image, setImage] = useState("");
	const [imageType, setImageType] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	let extImage;

	const dateNew = new Date();

	const yyyy = dateNew.getFullYear();
	let mm = dateNew.getMonth() + 1; // Months start at 0!
	let dd = dateNew.getDate();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;

	const dateNow = yyyy + '-' + mm + '-' + dd;

	const setFileToBase = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImage(reader.result);
		};
	};

	const handleFileChange = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(null);
			return;
		}

		const file = e.target.files[0];

		if (file.size > 1024 * 1024) {
			Swal.fire({
				title: "Failed!",
				text: "File size exceeds the limit of 1MB",
				icon: "error",
				confirmButtonText: "OK",
			});
			setSelectedFile(null);
			return;
		}

		setFileToBase(file);
		setImageType(file.name);
		setSelectedFile(file);
	};

	const [preview, setPreview] = useState();

	// create a preview as a side effect, whenever selected file is changed
	useEffect(() => {
		if (!selectedFile) {
			setPreview(null);
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);

		// free memory whenever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	const saveActivity = async (event) => {
		event.preventDefault();

		setIsLoading(true);
		if (imageType) {
			extImage = imageType.split(".").pop();
		} else {
			extImage = imageType;
		}

		if (
			!name ||
			!duration ||
			!type ||
			!date ||
			!weight ||
			name.length < 3 ||
			name.length > 30 ||
			weight > 442 ||
			weight < 0 ||
			duration.hour < 0 ||
			duration.minute < 0 ||
			duration.minute > 59
		) {
			setShowValidationMessage(true);
			return;
		}

		const formData = new FormData();
		formData.append("image", image);
		formData.append("user_id", user._id); // Replace with the provided user ID
		formData.append("activity_name", name);
		formData.append("duration", JSON.stringify(duration)); // Convert duration object to string
		formData.append("activity_type", type);
		formData.append("calendar", date);
		formData.append("weight", weight);
		formData.append("description", text);
		formData.append("extImage", extImage);

		try {
			const response = await axios.post("activities/add/", formData);
			if (response.status === 200) {
				Swal.fire({
					title: "Activity added!",
					icon: "success",
					confirmButtonText: "OK",
				});
			}

			// Handle the response as per your application requirements
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "Failed!",
				text: error.response.data,
				icon: "error",
				confirmButtonText: "Try",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="card-container">
			{isLoading && <IsLoadingComponent position={'position-fixed'} />}

			<div className="card-top">
				<div className="back-button-container pt-3">
					<Link to="/dashboard">
						<FontAwesomeIcon
							className="backIcon"
							icon="fa-solid fa-arrow-left"
							style={{
								color: "#b4bcca",
								fontSize: "2rem",
							}}
						/>
					</Link>
				</div>

				<div className="card-left">
					<div className="add-image">
						<label htmlFor="file-regis" style={{ marginRight: "13px" }}>
							<span>Upload Image File</span>
							<div>
								{!selectedFile ? (
									<>
										<FontAwesomeIcon
											className="imageIcon"
											icon="fa-regular fa-image"
											style={{ color: "#b4bcca" }}
										/>
									</>
								) : (
									selectedFile && <img src={preview} alt="Preview" />
								)}
								<div>
									<input
										type="file"
										accept=".png, .jpeg, .jpg, .gif"
										id="file-regiss"
										onChange={handleFileChange}
									/>
									<label htmlFor="file-regiss" id="file-regiss">
										{" "}
										Upload Image
									</label>
								</div>
							</div>
						</label>
					</div>

					<div className="name">
						<label htmlFor="name">
							Activity Name<span style={{ color: "red" }}>*</span>
						</label>
						<input
							type="text"
							className="fill"
							minLength="3"
							maxLength="30"
							style={{fontWeight:"bold"}}
							onChange={(e) => setName(e.target.value)}
							required
						/>

						{name.length > 0 && (name.length < 3 || name.length > 30) ? (
							<p className="warning-box">
								Please enter a valid activity name (3-30 characters).
							</p>
						) : null}
					</div>

					<div className="duration">
						<label htmlFor="duration">
							Activity Duration<span style={{ color: "red" }}>*</span>
						</label>
						<div className="duration-input">
							<label htmlFor="hours">Hours</label>
							<input
								type="number"
								id="hours"
								className="hours"
								style={{fontWeight:"bold"}}
								min="0"
								onChange={(e) => setHours(e.target.value)}
								required
							/>
							<span className="duration-separator">:</span>
							<label htmlFor="minutes">Minutes (0-59)</label>
							<input
								type="number"
								id="minutes"
								className="minutes"
								style={{fontWeight:"bold"}}
								min="0"
								max="59"
								onChange={(e) => {
									const minutes = Math.min(e.target.value, 59); // Ensure minutes do not exceed 59
									setMinutes(minutes);
								}}
								required
							/>
						</div>
					</div>
				</div>
				<div className="card-right">
					<div className="type" style={{marginRight:"17px"}}>
						<label htmlFor="type">
							Activity Type<span style={{ color: "red" }}>*</span>
						</label>
						<select
							name="act-type"
							id="act-type"
							onChange={(e) => setType(e.target.value)}
							style={{fontWeight:"bold"}}
						>
							<option value="run" style={{fontWeight:"bold"}}>Running</option>
							<option value="bicycle" style={{fontWeight:"bold"}}>Bicycling</option>
							<option value="ride" style={{fontWeight:"bold"}}>Riding</option>
							<option value="swim" style={{fontWeight:"bold"}}>Swimming</option>
							<option value="walk" style={{fontWeight:"bold"}}>Walking</option>
							<option value="hike" style={{fontWeight:"bold"}}>Hiking</option>
						</select>
					</div>

					<div className="date" style={{marginRight:"17px"}}>
						<label htmlFor="date">
							Date<span style={{ color: "red" }}>*</span>
						</label>
						<input
							type="date"
							className="fill"
							style={{fontWeight:"bold"}}
							onChange={(e) => setDate(e.target.value)}
							// max="2023-05-23"
							max={dateNow}
							required
						/>
					</div>
					<div className="weight">
						<label htmlFor="weight">
							Current Weight (kg)<span style={{ color: "red" }}>*</span>
						</label>
						<input
							type="number"
							className="fill"
							min="0"
							max="442"
							style={{fontWeight:"bold"}}
							onChange={(e) => setWeight(e.target.value)}
							required
						/>
						{weight > 442 || weight < 0 ? (
							<p className="warning-box">
								Weight must be between 0 and 442 kg.
							</p>
						) : null}
					</div>
				</div>
			</div>

			<div className="card-description">
				<label htmlFor="weight">Describe your journey</label>
				<textarea
					type="text"
					className="fill"
					onChange={(e) => setText(e.target.value)}
					minLength="0"
					maxLength="280"
					style={{ overflowWrap: "break-word",fontWeight:"bold" }}
				/>
			</div>

			<div className="card-buttons">
				<button
					className="cancel"
					onClick={() => {
						window.location.replace("/dashboard");
					}}
				>
					Cancel
				</button>
				<button className="add" onClick={saveActivity}>
					Save
				</button>
				{showValidationMessage && (
					<div>
						{(() => {
							Swal.fire({
								title:
									"Please fill in all fields marked with (*) before clicking Save.",
								icon: "error",
								confirmButtonText: "OK",
							});
							setShowValidationMessage(false); // Resetting showValidationMessage to false

							return null;
						})()}
					</div>
				)}
			</div>
		</div>
	);
};

export default CrudCreate;
