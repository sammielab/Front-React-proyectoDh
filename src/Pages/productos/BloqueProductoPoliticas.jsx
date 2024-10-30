import React from 'react';
import { Box, Typography, Grid } from '@mui/material';


export const BloqueProductoPoliticas = ({politicas}) => {
  const mitad = Math.ceil(politicas.length / 2);
  const primeraMitad = politicas.slice(0, mitad);
  const segundaMitad = politicas.slice(mitad);

  return (
    <Box
    sx={{
      width: '100%',
      padding: 2,
      backgroundColor: '#f5f5f5',
      borderRadius: 2,
    }}
  >
    <Typography variant="h5" sx={{ textDecoration: 'underline', marginBottom: 2 }}>
      Políticas
    </Typography>
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
      }}
    >
      
     
        <Box sx={{ width: '50%' }}>
          {primeraMitad.map((policy, index) => (
            <Typography key={index} variant="body2">
              {policy}
            </Typography>
          ))}
        </Box>
        <Box sx={{ width: '50%' }}>
          {segundaMitad.map((policy, index) => (
            <Typography key={index} variant="body2">
              {policy}
            </Typography>
          ))}
        </Box>
   

    </Box>
  </Box>
  );
};


