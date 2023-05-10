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
			<p className="goalProgressInfo">
				Goal : <strong>{goal}</strong> kg{" "}
				<Button variant="" href="/specificgoal">
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
