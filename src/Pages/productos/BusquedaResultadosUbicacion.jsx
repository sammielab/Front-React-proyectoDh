import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Typography, Grid, Card, CardContent } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { Add } from '@mui/icons-material';
import NavBar from '../../Components/Navegacion/NavBar';

export const BusquedaResultadosUbicacion = () => {
  const [productos, setProductos] = useState([]);
  const location = useLocation();
  const { location: ciudad, selectedDate, checkoutDate } = location.state || { location: '', selectedDate: null, checkoutDate: null };
  const {auth} = useAuth();
  const token = auth?.token
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`http://localhost:8080/productos/findFilteredProducts?ciudad=${ciudad}&checkin=${selectedDate}&checkout=${checkoutDate}`, { 
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
         });

         console.log(response)

         if (!response.ok) {
          throw new Error('Error al buscar productos');
        }else{
          const data = await response.json();
          if(data){
           setProductos(data)
          };
        }
       
      } catch (error) {
        console.error('Error al buscar productos:', error);
      }
    };

    if (ciudad && selectedDate && checkoutDate) {
      fetchProductos();
    }
  }, [ciudad, selectedDate, checkoutDate]);

  const handleProduct = (producto) => {
    navigate(`/productos/${producto}`);
  }

  return (
    <>
    <NavBar></NavBar>
  
    <Box>
      <Box sx={{ padding: '2rem' }}>
        {productos && productos.length > 0 && (
           <Typography variant="h6" sx={{ marginTop: '2rem', color:'white' }}>
              {`Mostrando ${productos.length} de ${productos.length} productos`}
          </Typography>
        )}
        {productos && productos.length > 0 && (
          <Box container spacing={2} sx={{ marginTop: '1rem' }}>
            {productos.map((producto) => (
              <Box item xs={12} sm={6} md={4} key={producto.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">{producto.titulo}</Typography>
                    <Typography variant="body2">{producto.descripcion}</Typography>
                    <Button
                       variant="contained"
                       startIcon={<Add />}
                       onClick={()=>handleProduct(producto.id)} 
                    >Ver</Button>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
    </>
  );
};
