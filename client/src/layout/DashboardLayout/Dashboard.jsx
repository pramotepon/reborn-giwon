import React from "react";
import GoalProgress from "../../components/GoalProgress";
import Navbar from "../../components/Navbar";
import UserProfile from "../../components/UserProfile";

const Dashboard = ({ children }) => {
	return (
		<div className="dashboard">
			<Navbar />

			<div className="row">
				<div className="userAndGoal col-3">
					<UserProfile />
					<GoalProgress />
				</div>

				<div className="rightContainer col-9">{children}</div>
			</div>
			<br></br>
		</div>
	);
};

export default Dashboard;
