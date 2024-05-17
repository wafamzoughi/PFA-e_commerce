import React from "react";
import'./Navbar.css'
import logo from '../../assets/logoo.png'
import navlogo from '../../assets/navlogo.png'
const Navbar = () => {
    return(
        <div className="navbar">
            <img src={logo} alt="" className="logo"/>
            <img src={navlogo} alt="" className="nav-logo"/>
        </div>
    )
}
export default Navbar