import React from "react";
import { NavLink } from "react-router-dom";
import CarWidget from "./CartWidget";

const NavBar = () => {
    return (
        <nav className="navbar has-text-danger-dark" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <NavLink className="navbar-item is-flex-direction-column" to="/">
                    <img src="../public/cabin.png" alt="" />
                    <span className="mt-1"> Robert</span>
                </NavLink>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start "></div>
                <div className="navbar-center has-text-weight-semibold is-size-5 is-italic is-flex is-justify-content-center">
                    <NavLink className="navbar-item p-5 mr-3" to="/">Inicio</NavLink>
                    <NavLink className="navbar-item p-5 mr-3" to="/category/Muebles">Muebles</NavLink>
                    <NavLink className="navbar-item p-5 mr-3" to="/category/Interior">Interior</NavLink>
                    <NavLink className="navbar-item p-5 mr-3" to="/category/Exterior">Exterior</NavLink>
                </div>
                <div className="navbar-end">
                    <NavLink className="navbar-item mr-6 mt-3" to="/checkOut">
                        <CarWidget />
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

//*NavBar.jsx