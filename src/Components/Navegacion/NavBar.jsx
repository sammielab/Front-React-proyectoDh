import React, { useContext, useState, useEffect } from "react";
import logo from "../../assets/logo.png"
import { NavLink } from "react-router-dom"
import { CartModal } from "../CartModal";
import useAuth from "../../hooks/useAuth";
import {AppRegistration, Logout, Person} from '@mui/icons-material'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import Login from '@mui/icons-material/Login';

export default function NavBar() {
  const navigate = useNavigate();

  const {auth,setAuth} = useAuth(); 

  const [showModal, setShowModal] = useState(false);
  const [isLogged, setIsLogged] = useState(false); 

  const handleShowModal = () => {
    setShowModal(!showModal)
  }
  
  const handleLogout = () => {
      setAuth(null);
      navigate('/')
  }

  useEffect(() => {
      if(auth){
        setIsLogged(true)
 
      }else{
        setIsLogged(false)

      }
    }, [auth]);



      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    

      const handlePerfil = () =>{
        navigate('/usuario/perfil')
      }

      const handleProductosFav = () => {
        navigate('/usuario/favoritos')
      }


      const handleReservas = () => {
        navigate('/reservas/usuario')
      }

  return (
<nav className="navbar navbar-expand-lg bg-blue">
  <div className="container-fluid">
   <NavLink to='/'  ><img src={logo} alt="logo" id="logo" href="/" /></NavLink>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 header">
        <li className="nav-item">
          <a className="nav-link inactive light-color fs-2" aria-current="page"></a>
        </li>
    <NavLink to='/productos'>
        <li className="nav-item">
          <a className="nav-link inactive light-color fs-2" aria-current="page">PRODUCTOS</a>
        </li>
    </NavLink>
    
   


    {auth?.email && auth?.role !== 'USER' &&(
    <NavLink to='/admin'>
        <li className="nav-item">
          <a className="nav-link inactive light-color fs-2" aria-current="page">ADMINISTRAR</a>
        </li>
    </NavLink>
    )}
      

      { auth && auth.name ? (
        <div className="d-flex">
        <p className="light-color bold fs-2"> HOLA {auth.name } </p>
        <div>
          <Person
            id="basic-button"
            color="primary"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          ></Person>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handlePerfil}>Perfil</MenuItem>
            <MenuItem onClick={handleProductosFav}>Productos Favoritos</MenuItem>
            <MenuItem onClick={handleReservas}>Reservas</MenuItem>
            <MenuItem onClick={handleLogout}><Logout></Logout></MenuItem>
          </Menu>
        </div>
        </div>
      ):(
        <div className="registro-login">
        <NavLink to={'/login'}>
            <li className="nav-item">
              <a className="nav-link light-color" href="#"><Login></Login></a>
            </li>
          </NavLink>
          <NavLink to='/register'>
            <li className="nav-item">
            <a className="nav-link light-color" href="#"><AppRegistration></AppRegistration></a>
            </li>
          </NavLink>
      </div>
      )}
      </ul>
     
    </div>
  {showModal && (<CartModal handleShowModal={handleShowModal} />)}
  </div>
</nav>
  )
}
