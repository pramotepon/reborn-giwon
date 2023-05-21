import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import ActivityCard from "../components/ActivityCard";
import ButtonNewActivity from "../components/ButtonNewActivity";
import { UserContext } from "../contexts/UserContext";
import Dashboard from "../layout/DashboardLayout/Dashboard";

const ActivityCardScreen = () => {
	const [weightData, setWeightData] = useState([]);
	const [goalWeight, setGoalWeight] = useState(0);

	const [activities, setActivities] = useState([]);

	const { user } = useContext(UserContext);

	const fetchData = async () => {
		try {
			const response = await axios.get(`/activities/user/${user._id}`);
			const data = response.data;
			console.log(data);
			setActivities(data);
			setWeightData(data.current_weight); // Assuming the weight data is returned as an array
			setGoalWeight(user.goal); // Assuming the goal weight is returned as a number
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Dashboard>
			<div className="mb-3">
				<ButtonNewActivity activity={activities} />
			</div>
			{activities.map((activity, index) => {
				return <ActivityCard activity={activity} key={index} />;
			})}
		</Dashboard>
	);
};

export default ActivityCardScreen;
