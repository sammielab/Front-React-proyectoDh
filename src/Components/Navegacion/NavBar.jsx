import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { CartModal } from "../CartModal";
import useAuth from "../../hooks/useAuth";
import { AppRegistration, Logout, Person } from '@mui/icons-material';
import Login from '@mui/icons-material/Login';
import { AppBar, Toolbar, Button, Menu, MenuItem, IconButton, Typography } from '@mui/material';

export default function NavBar() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePerfil = () => {
    navigate('/usuario/perfil');
  };

  const handleProductosFav = () => {
    navigate('/usuario/favoritos');
  };

  const handleReservas = () => {
    navigate('/reservas/usuario');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#222D52', marginBottom:2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <NavLink to='/'>
          <img src={logo} alt="logo" id="logo" style={{ height: '50px' }} />
        </NavLink>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
            <li>
              <NavLink to='/productos'>
                <Button className="nav-link inactive light-color fs-2" sx={{ color: 'white' }}>
                  PRODUCTOS
                </Button>
              </NavLink>
            </li>
            {auth?.email && auth?.role !== 'USER' && (
              <li>
                <NavLink to='/admin'>
                  <Button className="nav-link inactive light-color fs-2" sx={{ color: 'white' }}>
                    ADMINISTRAR
                  </Button>
                </NavLink>
              </li>
            )}
          </ul>
          {auth && auth.name ? (
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
              <Typography className="light-color bold fs-2" sx={{ color: 'white', marginRight: 1 }}>
                HOLA {auth.name.toUpperCase()}
              </Typography>
              <IconButton
                color="inherit"
                onClick={handleClick}
              >
                <Person />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handlePerfil}>Perfil</MenuItem>
                <MenuItem onClick={handleProductosFav}>Productos Favoritos</MenuItem>
                <MenuItem onClick={handleReservas}>Reservas</MenuItem>
                <MenuItem onClick={handleLogout}><Logout /></MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="registro-login" style={{ display: 'flex', marginLeft: '16px' }}>
              <NavLink to={'/login'}>
                <Button className="nav-link light-color" sx={{ color: 'white' }} startIcon={<Login />}></Button>
              </NavLink>
              <NavLink to='/register'>
                <Button className="nav-link light-color" sx={{ color: 'white' }} startIcon={<AppRegistration />}></Button>
              </NavLink>
            </div>
          )}
        </div>
        {showModal && (<CartModal handleShowModal={handleShowModal} />)}
      </Toolbar>
    </AppBar>
  );
}
