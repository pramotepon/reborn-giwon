import axios from "axios";
import "chart.js/auto";
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
	const chartData = {
		labels:
			weightData && weightData.length > 0
				? weightData.map((data) => data.date)
				: [],
		datasets: [
			{
				label: "Weight",
				data:
					weightData && weightData.length > 0
						? weightData.map((data) => data.weight)
						: [],
				borderColor: "rgba(75, 192, 192, 1)",
				backgroundColor: "rgba(75, 192, 192, 0.4)",
			},
			{
				label: "Goal",
				data: Array(weightData.length).fill(goalWeight),
				borderColor: "rgba(255, 99, 132, 1)",
				backgroundColor: "rgba(255, 99, 132, 0.4)",
				borderDash: [5, 5],
			},
		],
	};

	const chartOptions = {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	return (
		<Dashboard>
			<div className="mb-3">
				<ButtonNewActivity activity={activities} />
			</div>
			<div>
				<h2>Weight Trend</h2>
				{weightData ? (
					<Line data={chartData} options={chartOptions} />
				) : (
					<p>No weight data available.</p>
				)}
			</div>

			{activities.map((activity, index) => {
				return <ActivityCard activity={activity} key={index} />;
			})}
		</Dashboard>
	);
};

export default ActivityCardScreen;
