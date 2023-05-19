import React from "react";
import Dashboard from "../layout/DashboardLayout/Dashboard";
import ActivityCard from "../components/ActivityCard";
import ButtonNewActivity from "../components/ButtonNewActivity";
import { Link } from "react-router-dom";

const ActivityCardScreen = () => {
	let mockActivities = [
		{
			title: "วิ่งแบบพี่ตูน",
			description: "เหนื่อยยยยย ไม่อยากวิ้งแบบพี่ตูนแล้วอยากวิ่งแบบเจนนี่",
			createdDate: "12/4/2023 12:32",
			img: "https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/01/Runner-training-on-running-track-1296x728-header-1296x728.jpg?w=1155&h=1528",
		},
		{
			title: "ว่ายน้ำกับโตโน่ ",
			description: "เหนื่อยยยยย ไม่อยากวิ้งแบบพี่ตูนแล้วอยากวิ่งแบบเจนนี่",
			createdDate: "12/4/2023 12:32",
			img: "https://d1s9j44aio5gjs.cloudfront.net/2016/07/The_Benefits_of_Swimming.jpg",
		},
		{
			title: "ปั่นเพื่อพ่อ",
			description: "เหนื่อยยยยย ไม่อยากวิ้งแบบพี่ตูนแล้วอยากวิ่งแบบเจนนี่",
			createdDate: "12/4/2023 12:32",
			img: "https://www.khaosodenglish.com/wp-content/uploads/2018/11/14498299351449830078l.jpg",
		},
	];
	return (
		<Dashboard>
			<div className="mb-3">
			
				<ButtonNewActivity activity={mockActivities} />
			</div>
			{mockActivities.map((x, index) => {
				return <ActivityCard activity={x} key={index} />;
			})}
		</Dashboard>
	);
};

export default ActivityCardScreen;
