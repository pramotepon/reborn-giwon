import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import "../assets/css/components/SpecificGoal.css";
import { UserContext } from "../contexts/UserContext";

const SpecificGoal = () => {
	const { user } = useContext(UserContext);
	const [weight, setWeight] = useState(0);

	const intWeight = parseInt(weight);

	const handleIncrement = () => {
		setWeight(intWeight + 1);
	};

	const handleDecrement = () => {
		if (intWeight > 0) {
			setWeight(intWeight - 1);
		}
	};

	const handleInputChange = (event) => {
		const value = event.target.value;
		if (value >= 0) {
			setWeight(value);
		}
	};

	const handleConfirm = () => {
		if (weight === 0) {
			Swal.fire({
				title: "Please Select Your Goal",
				text: "Select a goal to continue",
				icon: "info",
				confirmButtonText: "Back",
			});
		} else if (weight >= 1) {
			axios
				.put(`/users/goal-weight-update/${user._id}`, { goal: weight })
				.then((response) => {
					if (response.status === 200) {
						Swal.fire({
							title: "Goal Updated",
							text: "Your goal weight has been updated successfully",
							icon: "success",
							confirmButtonText: "OK",
						}).then(() => {
							window.location.href = "/dashboard";
						});
					}
				})
				.catch((error) => {
					Swal.fire({
						title: "Error",
						text: "An error occurred while updating the goal weight",
						icon: "error",
						confirmButtonText: "OK",
					});
				});
		}
	};

	return (
		<div className="weightContainer">
			<label className="setGoal">Set Your Weight Goal (kg):</label>

			<div className="weightGoal">
				<div className="input-stepper">
					<input
						className="input-weight"
						type="number"
						id="weight-input"
						value={weight}
						onChange={handleInputChange}
					/>

					<div className="stepper">
						<FontAwesomeIcon
							icon="fa-solid fa-angle-up"
							onClick={handleIncrement}
							className="pointer"
						/>

						<FontAwesomeIcon
							icon="fa-solid fa-angle-down"
							onClick={handleDecrement}
							className="pointer"
						/>
					</div>
				</div>

				<button className="done" onClick={handleConfirm}>
					Done
				</button>
			</div>
		</div>
	);
};

export default SpecificGoal;
