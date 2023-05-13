import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Alert } from "bootstrap";
import React, { useRef, useState } from "react";
import "../assets/css/components/CRUD.css";

const CrudCreate = () => {
	const [name, setName] = useState("");
	const [duration, setDuration] = useState(0);
	const [type, setType] = useState("");
	const [date, setDate] = useState("");
	const [weight, setWeight] = useState(0);
	const [text, setText] = useState("");
	const [image, setImage] = useState(null);

	const handleChangeImage = (event) => {
		const file = event.target.files[0];
		setFileToBase(file);
		console.log(file);
	};

	const setFileToBase = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImage(reader.result);
		};
	};

	const saveActivity = async (event) => {
		event.preventDefault();

		const activityData = {
			user_id: "645de9a2c6b3517d15501e5c", // Replace with the provided user ID
			activity_name: name,
			duration: duration,
			activity_type: type,
			calendar: date,
			weight: weight,
			description: text,
			image: image,
		};
		const response = await axios.post(
			"http://127.0.0.1:8080/activities/add/",
			activityData // Cannot use localhost but have to use 127 instead
		);

		console.log(response);
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
										id="file-regis"
										name="file"
										placeholder="img"
										accept="image/*"
										onChange={handleChangeImage}
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
							<option value="Swimming">Bicycling</option>
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
