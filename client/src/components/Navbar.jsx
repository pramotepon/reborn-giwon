import React, { useContext } from 'react'
import { UserContext } from "../contexts/UserContext";
import '../assets/css/components/navbar.css'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ profileHandleToggle }) => {
    const { setUser } = useContext(UserContext);
    const nav = useNavigate();

    const logoutHandler = async () => {
        localStorage.removeItem('user');
        setUser(null);
        nav('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark my-bg-blue-soft fixed-top">
            <div className="container-fluid">
                <button className='btn btn-outline-dark btn-profile' onClick={profileHandleToggle}><i class="fa-solid fa-user fa-2xl"></i></button>
                <Link to={'/dashboard'} className="navbar-brand"><img src='../src/image/logo.png' width={147} height={50} /></Link>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <button className='btn my-btn-danger' onClick={logoutHandler}>
                            Sign out <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar