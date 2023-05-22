import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./layout/DashboardLayout/Dashboard.jsx";
import ActivityCardEditScreen from "./Screens/ActivityCardEditScreen.jsx";
import ActivityCardScreen from "./Screens/ActivityCardScreen.jsx";
import ActivityDetailScreen from "./Screens/ActivityDetailScreen.jsx";
import CRUDScreen from "./Screens/CRUDScreen.jsx";
import EditProfileScreen from "./Screens/EditProfileScreen.jsx";
import GoalSelectionScreen from "./Screens/GoalSelectionScreen.jsx";
import LandingPage from "./Screens/LandingPage.jsx";
import LoginScreen from "./Screens/LoginScreen.jsx";
import NewPassScreen from "./Screens/NewPassScreen.jsx";
import RegisterScreen from "./Screens/RegisterScreen.jsx";
import ResetPassScreen from "./Screens/ResetPassScreen.jsx";
import SpecificGoalScreen from "./Screens/SpecificGoalScreen.jsx";
import SuccessScreen from "./Screens/SuccessScreen.jsx";
// Context
import { UserContextProvider } from "./contexts/UserContext.jsx";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/login",
		element: <LoginScreen />,
	},
	{
		path: "/register",
		element: <RegisterScreen />,
	},
	{
		path: "/resetpass",
		element: <ResetPassScreen />,
	},
	{
		path: "/newpass",
		element: <NewPassScreen />,
	},
	{
		path: "/editprofile",
		element: <EditProfileScreen />,
	},
	{
		path: "/dashboard",
		element: <ActivityCardScreen />,
	},
	{
		path: "/goalselection",
		element: <GoalSelectionScreen />,
	},
	{
		path: "/specificgoal",
		element: <SpecificGoalScreen />,
	},
	// {
	// 	path: "/activitycard",
	// 	element: <ActivityCardScreen />,
	// },
	{
		path: "/activitydetail/:id",
		element: <ActivityDetailScreen />,
	},
	{
		path: "/success",
		element: <SuccessScreen />,
	},
	{
		path: "/createcrud",
		element: <CRUDScreen />,
	},
	{
		path: "/editcard/:id",
		element: <ActivityCardEditScreen />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<UserContextProvider>
		<RouterProvider router={router} />
	</UserContextProvider>
);

library.add(fab, fas, far);
