import React from 'react';
import { Box, Typography, Grid } from '@mui/material';


export const BloqueProductoPoliticas = ({politicas}) => {
    console.log(politicas)
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
      {politicas.map((policy, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            padding: 2,
            backgroundColor: '#ffffff',
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            {policy}
          </Typography>
          <Typography variant="body2">{policy.description}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
  );
};


