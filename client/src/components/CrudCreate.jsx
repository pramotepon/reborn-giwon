import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Alert } from "bootstrap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../assets/css/components/CRUD.css";
import { UserContext } from "../contexts/UserContext";

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

	const handleFileChange = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(null);
			return;
		}
		// I've kept this example simple by using the first image instead of multiple
		setSelectedFile(e.target.files[0]);
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
		formData.append("image", selectedFile);
		formData.append("user_id", user._id); // Replace with the provided user ID
		formData.append("activity_name", name);
		formData.append("duration", JSON.stringify(duration)); // Convert duration object to string
		formData.append("activity_type", type);
		formData.append("calendar", date);
		formData.append("weight", weight);
		formData.append("description", text);

		try {
			const response = await axios.post("activities/add/", formData);
			console.log(response);
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
		}
	};

	return (
		<div className="card-container">
			<div className="card-top">
				<div className="card-left">
					<div className="add-image">
						<label htmlhtmlFor="file-regis">
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
										onChange={handleFileChange}
									/>
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
					<div className="type">
						<label htmlFor="type">
							Activity Type<span style={{ color: "red" }}>*</span>
						</label>
						<select
							name="act-type"
							id="act-type"
							onChange={(e) => setType(e.target.value)}
						>
							<option value="run">Running</option>
							<option value="bicycle">Bicycling</option>
							<option value="ride">Riding</option>
							<option value="swim">Swimming</option>
							<option value="walk">Walking</option>
							<option value="hike">Hiking</option>
						</select>
					</div>

					<div className="date">
						<label htmlFor="date">
							Date<span style={{ color: "red" }}>*</span>
						</label>
						<input
							type="date"
							className="fill"
							onChange={(e) => setDate(e.target.value)}
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
				<label htmlFor="weight">Describe your journal</label>
				<textarea
					type="text"
					className="fill"
					onChange={(e) => setText(e.target.value)}
					minLength="0"
					maxLength="280"
					style={{ overflowWrap: "break-word" }}
				/>
			</div>

			<div className="card-buttons">
				<Link to="/dashboard">
					<button className="cancel">Cancel</button>
				</Link>
				<button className="add" onClick={saveActivity}>
					Add
				</button>
				{showValidationMessage && (
					<div>
						{(() => {
							Swal.fire({
								title:
									"Please fill in all fields marked with (*) before clicking Add.",
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
