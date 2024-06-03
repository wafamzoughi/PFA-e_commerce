import React from "react";
import'./Navbar.css'
import logo from '../../assets/logo.png'
const Navbar = () => {
    return(
        <div className="navbar">
            <img src={logo} alt="logo" height="80"></img>
            <div className="nav-logo-name">
                <h2>ADMIN</h2>
                <h3>Panel</h3>
                </div>
        </div>
    )
}
export default Navbar