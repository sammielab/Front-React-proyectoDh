import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Components/Navegacion/NavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box,Button, Typography, Grid, Card, CardContent } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { Add } from '@mui/icons-material';


export const BusquedaResultados = () => {
  const [productos, setProductos] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);

  const location = useLocation();
  const { categorias } = location.state || { categorias: [] };
  const {auth} = useAuth();
  const token = auth?.token
  const navigate = useNavigate();

useEffect(() => {
  const fetchProductos = async () => {
    try {
      const categoriasArray = categorias.map(Number);
      console.log(categoriasArray)
      const response = await fetch('http://localhost:8080/productos/findByCategoryId', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoriasArray),
        
      });

      if (!response.ok) {
        throw new Error('Error al buscar productos');
      }

      const data = await response.json();
      console.log(data)
      if(data){
        setProductos(data);
      }
      
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  if (categorias.length > 0) {
    fetchProductos();
  }
}, [categorias]);


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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '1rem' }}>
          {productos && productos.length > 0 ? (
            productos.map((producto) => (
              <Box key={producto.id} sx={{ flex: '1 1 calc(33.333% - 16px)', boxSizing: 'border-box' }}>
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
            ))
          ) : (
            <Typography variant="body1">No se encontraron productos.</Typography>
          )}
        </Box>
      </Box>
    </Box>
    </>
  );
};

