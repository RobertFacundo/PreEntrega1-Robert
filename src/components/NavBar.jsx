import React from "react";
import CarWidget from "./CartWidget";

const NavBar = () => {
    return ( 
        <nav className="navbar has-text-danger-dark" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item is-flex-direction-column" href="#">
                    <img src="../public/cabin.png"alt="" />
                   <span className="mt-1"> Robert</span>
                </a>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start "></div>
                <div className="navbar-center has-text-weight-semibold is-size-5 is-italic is-flex is-justify-content-center">
                    <a className="navbar-item p-5 mr-3" href="#">Inicio</a>
                    <a className="navbar-item p-5 mr-3" href="#">Muebles</a>
                    <a className="navbar-item p-5 mr-3" href="#">Interior</a>
                    <a className="navbar-item p-5 mr-3" href="#">Exterior</a>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item mr-6 mt-3">
                        <CarWidget />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;