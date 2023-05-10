import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./assets/css/login.css";
import ButtonNewActivity from "./components/ButtonNewActivity.jsx";
import Navbar from "./components/Navbar.jsx";
import "./index.css";
import Dashboard from "./layout/DashboardLayout/Dashboard.jsx";
import EditProfileScreen from "./Screens/editprofilescreen.jsx";
import LandingPage from "./Screens/LandingPage.jsx";
import LoginScreen from "./Screens/loginscreen.jsx";
import NewPassScreen from "./Screens/newpassscreen.jsx";
import RegisterScreen from "./Screens/registerscreen.jsx";
import ResetPassScreen from "./Screens/resetpassscreen.jsx";

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
		element: <Dashboard />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);

library.add(fab, fas, far);
