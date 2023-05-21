import axios from "axios";
import React, { useState } from "react";

const TestPage = () => {
	const [formData, setFormData] = useState({});

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.put("/activities/123", formData)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<div>
			<h1>Test Page</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="title">Title:</label>
				<input
					type="text"
					id="title"
					name="title"
					onChange={handleInputChange}
				/>
				<br />
				<label htmlFor="description">Description:</label>
				<textarea
					id="description"
					name="description"
					onChange={handleInputChange}
				></textarea>
				<br />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default TestPage;
