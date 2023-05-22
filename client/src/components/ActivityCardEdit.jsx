import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Alert } from "bootstrap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../assets/css/components/CRUD.css";
import { UserContext } from "../contexts/UserContext";
import IsLoadingComponent from "./IsLoadingComponent";

const CrudCreate = (props) => {
	const splitIDFrom = (id) => {
		const splitID = id.split("&");
		return splitID;
	};

	const id = splitIDFrom(props.acitivityId)[0];
	const latest = splitIDFrom(props.acitivityId)[1];
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
	const [oldImage, setOldImage] = useState(""); // New state variable to store the old image URL
	const [imageType, setImageType] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const maxFileSize = 5; // 5MB

	let extImage;

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
		const fileSizeInMB = file.size / (1024 * 1024); // Convert file size to MB
		if (fileSizeInMB > 1) {
			Swal.fire({
				title: "File size limit exceeded",
				text: "Please upload an image file up to 1MB in size.",
				icon: "error",
				confirmButtonText: "OK",
			});
			setSelectedFile(null);
			return;
		}
		setImageType(file.name);
		setFileToBase(file);
		setSelectedFile(file);
	};

	const [preview, setPreview] = useState();

	// create a preview as a side effect, whenever selected file is changed
	useEffect(() => {
		fetchActivityData();
		if (!selectedFile) {
			setPreview(null);
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);

		// free memory whenever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	const fetchActivityData = async () => {
		try {
			const response = await axios.get(`/activities/${id}`);
			console.log(response);
			if (response.status === 200) {
				setName(response.data.activity_name);
				setType(response.data.activity_type);
				setDate(new Date(response.data.calendar).toISOString().split("T")[0]);
				setWeight(response.data.current_weight);
				setText(response.data.description);
				setOldImage(response.data.image);
				setHours(JSON.parse(response.data.duration.hour));
				setMinutes(JSON.parse(response.data.duration.minute));
			}

			console.log("data " + response.data.duration.hour);
		} catch (error) {
			console.log(error);
		}
	};

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

		const formData = {
			activity_name: name,
			activity_type: type,
			calendar: date,
			hours: hours,
			minutes: minutes,
			description: text,
			weight: weight,
			image: image,
			extImage: extImage,
			latest: latest,
		};

		try {
			const response = await axios.put(`activities/${id}`, formData);
			console.log(response);
			if (response.status === 200) {
				Swal.fire({
					title: "Activity Edited Successfully",
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
			<div className="card-top">
				<div className="card-left">
					<div className="add-image">
						<label htmlFor="file-regis">
							<span>Upload Image File</span>
							<div>
								{!selectedFile && !oldImage ? (
									<FontAwesomeIcon
										className="imageIcon"
										icon="fa-regular fa-image"
										style={{ color: "#b4bcca" }}
									/>
								) : selectedFile ? (
									<img src={image} alt="Preview" />
								) : (
									<img src={oldImage} alt="Preview" />
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
							value={name}
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
								value={hours}
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
								value={minutes}
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
							value={type}
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
							value={date}
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
							value={weight}
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
					value={text}
					onChange={(e) => setText(e.target.value)}
					minLength="0"
					maxLength="280"
					style={{ overflowWrap: "break-word" }}
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
