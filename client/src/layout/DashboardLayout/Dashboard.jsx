import React from "react";
import "../../assets/css/DashboardScreen.css";
import GoalProgress from "../../components/GoalProgress";
import Navbar from "../../components/Navbar";
import UserProfile from "../../components/UserProfile";

const Dashboard = ({ children }) => {
	return (
		<div className="dashboard">
			<Navbar />

			<div className="row mt-5 pt-5">
				<div className="userAndGoal col-3">
					<div className="position-fixed container-user-profile">
						<UserProfile />
						<GoalProgress />
					</div>
				</div>

				<div className="rightContainer col-9">{children}</div>
			</div>
			<br></br>
		</div>
	);
};

export default Dashboard;
