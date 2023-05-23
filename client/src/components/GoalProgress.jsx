import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { Doughnut } from "react-chartjs-2";
import "../assets/css/components/GoalProgress.css";
import { UserContext } from "../contexts/UserContext";
// import logoImage from "../image/logo.png";

ChartJS.register(ArcElement, Tooltip, Legend);

const GoalProgess = ({ userId, userGoal, userWeight }) => {
	const [goal, setGoal] = useState(userGoal);
	const [weight, setWeight] = useState(userWeight);

	// const image = new Image();
	// image.src = "https://www.chartjs.org/img/chartjs-logo.svg";

	// const centerImagePlugin = {
	// 	id: "center-image",
	// 	beforeDraw: function (chart, args) {
	// 		const ctx = chart.ctx;
	// 		const canvas = chart.canvas;
	// 		const chartArea = chart.chartArea;

	// 		const logoSize = 80; // Adjust the size as needed
	// 		const x = (canvas.width - logoSize) / 2;
	// 		const y = (chartArea.top + chartArea.bottom - logoSize) / 2;

	// 		const image = new Image();
	// 		image.src = logoImage;

	// 		ctx.drawImage(image, x, y, logoSize, logoSize);
	// 	},
	// };

	const centerTextPlugin = {
		id: "center-text",
		beforeDraw: function (chart) {
			const ctx = chart.ctx;
			const canvas = chart.canvas;
			const chartArea = chart.chartArea;

			// const goal = chart.config.data.labels[0];
			const goalText = goal + " kg";

			ctx.font = "bold 30px Kanit";
			ctx.fillStyle = "#222";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			const x = canvas.width / 2;
			const y = (chartArea.top + chartArea.bottom) / 2;

			const lines = goalText.split("\n");
			const lineHeight = 30; // Adjust the line height as needed

			lines.forEach((line, index) => {
				const textY = y + (index - (lines.length - 1) / 2) * lineHeight;
				ctx.fillText(line, x, textY);
			});
		},
	};

	const chartData = {
		labels: ["Target", "Remaining"],
		datasets: [
			{
				data: [goal, weight - goal],
				backgroundColor: ["#58B90A", "#FF0046"],
				borderWidth: 0,
			},
		],
	};

	return (
		<div className="goalProgress position-relative">
			<div className="position-absolute top-0 start-0 mt-2 me-2 ">
				<p className="goalText">Goal</p>
			</div>
			<div className="position-absolute top-0 end-0 mt-2 me-2">
				<Button variant="" href="/goalselection">
					<FontAwesomeIcon
						className="editIcon"
						icon="fa-regular fa-pen-to-square"
					/>
				</Button>
			</div>
			<Doughnut
				className="w-50 h-50"
				data={chartData}
				plugins={[centerTextPlugin]}
			/>
		</div>
	);
};

export default GoalProgess;
