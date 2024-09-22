import React from "react";
import logo from "../assets/logo.png"
import { NavLink } from "react-router-dom"

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-beige">
  <div className="container-fluid">
   <NavLink to='/'  ><img src={logo} alt="logo" id="logo" href="/" /></NavLink>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 header">
        <li className="nav-item">
          <a className="nav-link inactive" aria-current="page">Moda que inspira</a>
        </li>
    <NavLink to='/productos'>
        <li className="nav-item">
          <a className="nav-link inactive" aria-current="page">Productos</a>
        </li>
    </NavLink>
    <NavLink to='/admin'>
        <li className="nav-item">
          <a className="nav-link inactive" aria-current="page">Admin</a>
        </li>
    </NavLink>
        
        <div className="registro-login">
            <li className="nav-item">
            <a className="nav-link" href="#">Iniciar Sesión</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">Registrate</a>
            </li>
        </div>
      
      </ul>
     
    </div>
  </div>
</nav>
  )
}
