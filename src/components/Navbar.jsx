import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../css/Navbar.css";
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await axios.get("http://localhost:5000/logout", { withCredentials: true });
            // console.log("Logged out successfully");
            navigate("/");
        } catch (error) {
            console.log("Logout error:", error);
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo">Instagram</div>
            <ul className="navbar-links">
                <li>
                    <NavLink to="feedpage">🏠 Home</NavLink>
                </li>
                <li>
                    <NavLink to="search">🔍 Search</NavLink>
                </li>
                <li>
                    <NavLink to="createpost">🧭 Explore ___</NavLink>
                </li>
                <li>
                    <NavLink to="createpost">🎞️ Reels ___</NavLink>
                </li>
                <li>
                    <NavLink to="chat">💌 Messages</NavLink>
                </li>
                <li>
                    <NavLink to="createpost">🔔 Notifications ___</NavLink>
                </li>
                <li>
                    <NavLink to="createpost">➕ Create</NavLink>
                </li>
                <li>
                    <NavLink to="profile">👤 Profile</NavLink>
                </li>
                <li>
                    <NavLink to="feedpage">⚙️ More ___</NavLink>
                </li>
            </ul>
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
    );
};

export default Navbar;
