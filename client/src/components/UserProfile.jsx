import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import "../assets/css/components/UserProfile.css";

const UserProfile = ({ userId, userDisplayName, userWeight, userImage }) => {
	const [weight, setWeight] = useState(userWeight);

	return (
		<div className="userProfile">
			<img src={userImage ? userImage : "http://placekitten.com/200/200"} className="img-fluid" alt="" />
			<div className="displayName">
				<p className="displayNameText">{userDisplayName}</p>
			</div>
			<p className="currentWeightText">Current Weight : {weight} kg</p>
			<Button variant="" href="/editprofile">
				<FontAwesomeIcon
					className="editIcon"
					icon="fa-regular fa-pen-to-square"
				/>
			</Button>
		</div>
	);
};

export default UserProfile;
