import React from 'react'
import NavBar from '../../Components/NavBar'
import { Card, CardContent, Typography, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 

export const ConfirmacionReservaPage = () => {
  return (
    <>
    <NavBar></NavBar>
    <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="100vh" // Asegura que esté centrada verticalmente
        >
            <Card 
                sx={{ 
                    maxWidth: 400, 
                    borderRadius: 2, 
                    boxShadow: 3,
                    textAlign: 'center' // Alinea el texto al centro
                }} 
            >
                <CardContent>
                    <CheckCircleIcon 
                        color="success" 
                        sx={{ fontSize: 60, mb: 2 }} // Tamaño y margen del ícono
                    />
                    <Typography variant="h5" gutterBottom>
                        Reserva Efectuada
                    </Typography>
                    <Typography variant="body2">
                        ¡Tu reserva se ha realizado con éxito! 
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    </>
  )
}
