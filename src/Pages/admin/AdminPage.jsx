import React, {useEffect}from 'react'
import NavBar from '../../Components/Navegacion/NavBar'
import MenuAdmin from '../../Components/MenuAdmin'
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

export const AdminPage = () => {

  const navigate = useNavigate();

  const checkWindowSize = () => {
    if (window.innerWidth < 1300) {
      alert("La pantalla es demasiado pequeña para mostrar este contenido.");
      navigate('/'); 
    }
  };

  useEffect(() => {
    checkWindowSize();
    
    window.addEventListener('resize', checkWindowSize);
    
    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <Box sx={{ padding: 2 }}>
        <MenuAdmin></MenuAdmin>
      </Box>
    </>
  )
}


