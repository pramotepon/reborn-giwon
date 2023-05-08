import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './assets/css/login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './Screens/LandingPage.jsx'
import LoginScreen from './Screens/loginscreen.jsx';
import RegisterScreen from './Screens/registerscreen.jsx';
import ResetPassScreen from './Screens/resetpassscreen.jsx';
import NewPassScreen from './Screens/newpassscreen.jsx';
import EditProfileScreen from './Screens/editprofilescreen.jsx';
import Navbar from './components/Navbar.jsx'
import ButtonNewActivity from './components/ButtonNewActivity.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/login',
    element: <LoginScreen />
  },
  {
    path: '/register',
    element: <RegisterScreen />
  },
  {
    path: '/resetpass',
    element: <ResetPassScreen />
  },
  {
    path: '/newpass',
    element: <NewPassScreen />
  },
  {
    path: '/editprofile',
    element: <EditProfileScreen />
  },
  {
    path: '/navbar',
    element: <Navbar />
  },
  {
    path: '/buttoncomponent',
    element: <ButtonNewActivity />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
