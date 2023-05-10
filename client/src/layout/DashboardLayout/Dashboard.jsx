import React from "react";
import GoalProgress from "../../components/GoalProgress";
import Navbar from "../../components/Navbar";
import UserProfile from "../../components/UserProfile";
import "../../assets/css/DashboardScreen.css";

const Dashboard = ({ children }) => {
	return (
		<div className="dashboard">
			{/* <Navbar /> */}

			<div className="row">
				<div className="userAndGoal col-3 mt-5 pt-4">
					<div className="position-fixed container-user-profile">
						<UserProfile />
						<GoalProgress />
					</div>
				</div>

				{/* <div className="rightContainer col-9">{children}</div> */}
				<div className="rightContainer col-9 mt-5 pt-5">
					<div className="min-vh-100">
						<h1>test</h1>
					</div>
					<div className="min-vh-100 bg-success">
						<h1>test</h1>
					</div>
					<div className="min-vh-100 bg-danger">
						<h1>test</h1>
					</div>
				</div>
			</div>
			<br></br>
		</div>
	);
};

export default Dashboard;
