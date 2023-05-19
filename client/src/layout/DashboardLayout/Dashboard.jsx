import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "../../assets/css/DashboardScreen.css";
import GoalProgress from "../../components/GoalProgress";
import GoalSelection from "../../components/GoalSelection";
import Navbar from "../../components/Navbar";
import UserProfile from "../../components/UserProfile";
import { UserContext } from "../../contexts/UserContext";

const Dashboard = ({ children }) => {
	const { user } = useContext(UserContext);

	let displayShow;
	if (!user) {
		return <Navigate to={"/login"} />;
	}

	if (!user.goal) {
		displayShow = <GoalSelection />;
	} else {
		displayShow = children;
	}

	return (
		<div className="dashboard">
			<Navbar />

			<div className="row mt-5 pt-5">
				<div className="userAndGoal col-3">
					<div className="position-fixed container-user-profile">
						<UserProfile
							userId={user._id}
							userDisplayName={user.displayName}
							userWeight={user.weight}
							userImage={user.image}
						/>
						<GoalProgress
							userId={user._id}
							userGoal={user.goal}
							userWeight={user.weight}
						/>
					</div>
				</div>

				<div className="rightContainer col-9">{displayShow}</div>
			</div>
			<br></br>
		</div>
	);
};

export default Dashboard;
