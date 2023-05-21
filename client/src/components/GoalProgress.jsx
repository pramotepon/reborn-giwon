import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArcElement, Chart as ChartJS } from "chart.js";
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { Doughnut } from "react-chartjs-2";
import "../assets/css/components/GoalProgress.css";
import { UserContext } from "../contexts/UserContext";

ChartJS.register(ArcElement);

const GoalProgess = ({ userId, userGoal, userWeight }) => {
	const [goal, setGoal] = useState(userGoal);
	const [weight, setWeight] = useState(userWeight);

	const chartData = {
		datasets: [
			{
				data: [goal, weight - goal],
				backgroundColor: ["#58B90A", "#FF0046"],
				borderWidth: 0,
			},
		],
	};

	return (
		<div className="goalProgress">
			<p className="goalProgressInfo">
				Goal : <strong>{!goal ? "?" : goal}</strong> kg{" "}
				<Button variant="" href="/goalselection">
					<FontAwesomeIcon
						className="editIcon"
						icon="fa-regular fa-pen-to-square"
					/>
				</Button>
			</p>
			<Doughnut className="w-50 h-50" data={chartData} />
		</div>
	);
};

export default GoalProgess;
