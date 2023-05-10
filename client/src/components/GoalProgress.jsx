import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArcElement, Chart as ChartJS } from "chart.js";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Doughnut } from "react-chartjs-2";

import "../assets/css/components/GoalProgress.css";

ChartJS.register(ArcElement);

const GoalProgess = () => {
	const [goal, setGoal] = useState(70);

	const chartData = {
		datasets: [
			{
				data: [goal, 100 - goal],
				backgroundColor: ["#58B90A", "#FF0046"],
				borderWidth: 0,
			},
		],
	};

	return (
		<div className="goalProgress">
			<h3>
				Goal : <strong>{goal}</strong> kg{" "}
				<Button variant="">
					<FontAwesomeIcon
						className="editIcon"
						icon="fa-regular fa-pen-to-square"
					/>
				</Button>
			</h3>
			<Doughnut className="w-75 h-75" data={chartData} />
		</div>
	);
};

export default GoalProgess;
