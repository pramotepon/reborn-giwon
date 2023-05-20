import React, { useContext } from "react";
import Dashboard from "../layout/DashboardLayout/Dashboard";
import ActivityCard from "../components/ActivityCard";
import ButtonNewActivity from "../components/ButtonNewActivity";
import { Link } from "react-router-dom";
import { useState, useEffect,  } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";


const ActivityCardScreen = () => {
	const [activities, setActivities] = useState([]);

	const { user } = useContext(UserContext)

  
	const fetchData = async () => {
	  try {
		const response = await axios.get(`/activities/user/${user._id}`);
		const data = response.data;
		console.log(data);
		setActivities(data);
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
