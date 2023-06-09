import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/components/buttonNewActivity.css";

const ButtonNewActivity = (props) => {
	// const [activity, setActivity] = useState(props.activity);
	const activity = props.activity;
	let newActivity;

	const newActivityCard = (
		<Link to={"/createcrud"} className="first-card">
			<div>
				<h2>Start Your Frist Activity</h2>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="50"
					height="50"
					fill="currentColor"
					className="bi bi-plus-circle"
					viewBox="0 0 16 16"
				>
					<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
					<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
				</svg>
			</div>
		</Link>
	);
	if (activity.length === 0) {
		newActivity = newActivityCard;
	} else {
		newActivity = (
			<Link
				to={"/createcrud"}
				type="button"
				className="button-new-activity btn btn-success  "
			>
				New Activity
			</Link>
		);
	}

	return (
		<div className="section-right">
			<div className="text-end">{newActivity}</div>
		</div>
	);
};

export default ButtonNewActivity;
