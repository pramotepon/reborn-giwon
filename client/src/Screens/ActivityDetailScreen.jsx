import React from "react";
import Dashboard from "../layout/DashboardLayout/Dashboard";
import ActivityDetail from "../components/ActivityDetail";
import { useParams } from "react-router-dom";

const ActivityDetailScreen = () => {
	const { id } = useParams();
	
	return (
		<Dashboard>
			<ActivityDetail acitivityId={id}/>
		</Dashboard>
	);
};

export default ActivityDetailScreen;