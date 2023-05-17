import React, { useContext, useEffect, useState } from "react";
import "../../assets/css/DashboardScreen.css";
import GoalProgress from "../../components/GoalProgress";
import Navbar from "../../components/Navbar";
import UserProfile from "../../components/UserProfile";
import { UserContext } from "../../contexts/UserContext";
import { Navigate } from "react-router-dom";

const Dashboard = ({ children }) => {
	const { user } = useContext(UserContext);
	console.log(user);
	if (!user) {
		return <Navigate to={'/login'} />
	}

	return (
		<div className="dashboard">
			<Navbar />

			<div className="row mt-5 pt-5">
				<div className="userAndGoal col-3">
					<div className="position-fixed container-user-profile">
						<UserProfile userId={user._id} userDisplayName={user.displayName} userWeight={user.weight} />
						<GoalProgress userGoal={user.goal} />
					</div>
				</div>

				<div className="rightContainer col-9">{children}</div>
			</div>
			<br></br>
		</div>
	);
};

export default Dashboard;
