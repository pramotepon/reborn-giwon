import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Alert } from "bootstrap";
import React, { useContext, useRef, useState } from "react";
import "../assets/css/components/CRUD.css";
import { UserContext } from "../contexts/UserContext";

const CrudCreate = () => {
	const { user } = useContext(UserContext);

	const [name, setName] = useState("");
	const [duration, setDuration] = useState(0);
	const [type, setType] = useState("");
	const [date, setDate] = useState("");
	const [weight, setWeight] = useState(0);
	const [text, setText] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const saveActivity = async (event) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append("image", selectedFile);
		formData.append("user_id", user._id); // Replace with the provided user ID
		formData.append("activity_name", name);
		formData.append("duration", duration);
		formData.append("activity_type", type);
		formData.append("calendar", date);
		formData.append("weight", weight);
		formData.append("description", text);

		try {
			const response = await axios.post("activities/add/", formData);
			console.log(response);

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
						<label htmlFor="file-regis">
							<div className="hoverable-div">
								<FontAwesomeIcon
									className="imageIcon"
									icon="fa-regular fa-image"
									style={{ color: "#b4bcca" }}
								/>
								<FontAwesomeIcon
									className="plusIcon"
									icon="fa-solid fa-circle-plus"
									style={{ color: "#b4bcca" }}
								/>
								<div>
									<input
										type="file"
										accept="image/*"
										onChange={handleFileChange}
									/>
									<span>Upload Image File</span>
								</div>
							</div>
						</label>
					</div>

					<div className="name">
						<label for="name" className="Test">
							Activity Name
						</label>
						<input
							type="text"
							className="fill"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="duration">
						<label for="duration">Activity Duration</label>
						<input
							type="number"
							className="fill"
							min="0"
							onChange={(e) => setDuration(e.target.value)}
						/>
					</div>
				</div>

				<div className="card-right">
					<div className="type">
						<label for="type">Activity Type</label>
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
						<label for="date">Date</label>
						<input
							type="date"
							className="fill"
							onChange={(e) => setDate(e.target.value)}
						/>
					</div>
					<div className="weight">
						<label for="weight">Current Weight (kg)</label>
						<input
							type="number"
							className="fill"
							min="0"
							onChange={(e) => setWeight(e.target.value)}
						/>
					</div>
				</div>
			</div>

			<div className="card-description">
				<label for="weight">Describe your journal</label>
				<input
					type="text"
					className="fill"
					onChange={(e) => setText(e.target.value)}
				/>
			</div>

			<div className="card-buttons">
				<button className="cancel">Cancel</button>
				<button className="add" onClick={saveActivity}>
					Add
				</button>
			</div>
		</div>
	);
};

export default CrudCreate;
