import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "../assets/css/components/UserProfile.css";

const UserProfile = () => {
	const [weight, setWeight] = useState(95);

	return (
		<div className="userProfile">
			<img src="http://placekitten.com/200/200" class="img-fluid" alt="" />
			<div className="displayName">
				<p className="displayNameText">DisplayName</p>
			</div>
			<p className="currentWeightText">
				Current Weight : <strong>{weight}</strong> kg
			</p>
			<Button variant="">
				<FontAwesomeIcon
					className="editIcon"
					icon="fa-regular fa-pen-to-square"
				/>
			</Button>
		</div>
	);
};

export default UserProfile;