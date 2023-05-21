import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "../../assets/css/DashboardScreen.css";
import GoalProgress from "../../components/GoalProgress";
import GoalSelection from "../../components/GoalSelection";
import Navbar from "../../components/Navbar";
import SpecificGoal from "../../components/SpecificGoal";
import UserProfile from "../../components/UserProfile";
import { UserContext } from "../../contexts/UserContext";

const Dashboard = ({ children }) => {
	const { user, setUser } = useContext(UserContext);
	const [chooseIdol, setChooseIdol] = useState(true);
	const [profileToggle, setProfileToggle] = useState(false);
	if (!user) {
		return <Navigate to={"/login"} />;
	}
	const handleToggle = () => {
		setChooseIdol((current) => !current);
	};

	const profileHandleToggle = () => {
		setProfileToggle((current) => !current);
	};
	let profileShow;
	if (!profileToggle) {
		profileShow = '';
	} else {
		profileShow = 'show';
	}

	let displayShow;
	if (!user.goal) {
		if (chooseIdol) {
			displayShow = <GoalSelection handleToggle={handleToggle} />;
		} else {
			displayShow = <SpecificGoal handleToggle={handleToggle} />;
		}
	} else {
		displayShow = children;
	}

	useEffect(() => { }, [user]);

	return (
		<div className="dashboard">
			<Navbar profileHandleToggle={profileHandleToggle} />

			<div className="row mt-5 pt-5">
				<div className="userAndGoal col-md-3">
					<div className={`position-fixed container-user-profile ${profileShow}`}>
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

				<div className="rightContainer col-md-9">{displayShow}</div>
			</div>
			<br></br>
		</div>
	);
};

export default Dashboard;
