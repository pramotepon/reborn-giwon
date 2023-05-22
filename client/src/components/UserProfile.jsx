import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "../assets/css/components/UserProfile.css";

const UserProfile = ({ userId, userDisplayName, userWeight, userImage }) => {
	const [weight, setWeight] = useState(userWeight);
	const [hasAchievedGoal, setHasAchievedGoal] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchGoalAchievementStatus = async () => {
			try {
				const response = await axios.get(`/users/goal-success/${userId}`);
				const data = response.data;
				setHasAchievedGoal(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchGoalAchievementStatus();
	}, [userId]);

	useEffect(() => {
		if (hasAchievedGoal) {
			navigate("/success");
		}
	}, [hasAchievedGoal, navigate]);

	return (
		<div className="userProfile position-relative">
			<div className="position-absolute top-0 end-0 mt-2 me-2">
				<Button variant="" href="/editprofile">
					<FontAwesomeIcon
						className="editIcon"
						icon="fa-regular fa-pen-to-square"
					/>
				</Button>
			</div>
			<div className="text-center">
				<div className="user-profile-image">
					<img
						src={userImage ? userImage : "http://placekitten.com/200/200"}
						className="img-fluid"
						alt=""
					/>
				</div>
			</div>
			<div className="displayName">
				<p className="displayNameText">{userDisplayName}</p>
			</div>
			<p className="currentWeightText">Current Weight: {weight} kg</p>
		</div>
	);
};

export default UserProfile;
