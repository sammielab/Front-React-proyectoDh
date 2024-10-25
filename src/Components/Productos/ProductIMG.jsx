import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const ProductIMG = ({ imgdtos,idProducto }) => {
  
    const navigate = useNavigate(); 
    
    const handleCarrousel = () => {
        navigate(`/product/gallery/${idProducto}`)
    }
  return (
    <>
      {imgdtos &&  imgdtos.length > 0 ? (
      <Box sx={{ display: 'flex', width: '100%', height: 'auto', marginTop:2 }}>
        <Box
        sx={{
            flex: '1 1 50%', // Ocupa el 50% del contenedor
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'auto'
        }}
        >
        {imgdtos.length > 0 && (
            <img
            src={`data:image/jpeg;base64,${imgdtos[0].imagen}`}
            alt="Principal"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        )}
        </Box>

        <Box
        sx={{
            flex: '1 1 50%', 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1,
            height: 'auto', 
           
        }}
        >
        {imgdtos.slice(1).map((img, index) => (
            <Box key={index} 
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '320px', 
              }}
            >
            <img
                src={`data:image/jpeg;base64,${img.imagen}`}
                loading="lazy"
                alt={`Imagen ${index + 2}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            </Box>
        ))}
         <Box
              sx={{
                gridColumn: 'span 2', 
                display: 'flex',
                justifyContent: 'end', 
                marginTop: 2, 
              }}
            >
              <Button onClick={handleCarrousel} variant="" color="">Ver más</Button>
            </Box>
           
        </Box>
           
        </Box>
         ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h6">No hay imágenes disponibles</Typography>
            </Box>
        )}
    </>
  );
};


