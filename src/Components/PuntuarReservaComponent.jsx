import React, { useEffect } from 'react'
import {
    Box,
    Button,
    TextField,
    Typography,
    Rating,
    Card,
    CardContent,
    CardActions
  } from '@mui/material';
  import useAuth from '../hooks/useAuth'
  import moment from 'moment';
  import { useState } from 'react';
  import { savePuntuacion } from '../api/createPuntuacion';
  import { getUserByEmail } from '../api/getUserByEmail';
  import { useParams } from "react-router-dom"; 

export const PuntuarReservaComponent = () => {
    const { auth } = useAuth();
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState();
    const token = auth.token
    const [userById, setUserById] = useState();
    const { id } = useParams();

    const currentDate = moment().format('YYYY-MM-DD');

    const handleSubmit = async(e) => {
      e.preventDefault();
  
      if (!rating || !description) {
        setError('Por favor, completa todos los campos.');
        return;
      }else{

        const usuarioById = await getUserId(); 
        console.log(usuarioById)
        if(usuarioById){
        console.log(usuarioById)
            
          setUserData({
              "producto":{
                  "id": id, 
              }, 
              "usuario": {
                  "id": usuarioById.id, 
                  "role": auth.role,
              },
              "puntaje_total": rating,
              "fecha_publicacion": currentDate ,
              "descripcion": description
          })
      }
          

      }    
    };


    const fetchSavePuntuacion = async()=>{
        try{  
            console.log(token)
            console.log(userData)
            const rta = await savePuntuacion(token, userData)
            console.log(rta)

        }catch(e){
            console.log(e.message)
        }
    }


    useEffect(() => {
      if (userData && userData.puntaje_total) {
        fetchSavePuntuacion();
      }
    }, [userData]);
   

    const getUserId = async() => {
        try{
            const userId = await getUserByEmail(auth.email, token) 
            return userId
          
        }catch(e){
            console.log(e.message)
        }
    }

    useEffect(() =>{
        getUserId(); 
    }, []); 


  
  return (
    <>
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: '#f0f0f0' }} // Opcional, para un fondo gris claro
    >
      {auth ? (
        <Card sx={{ width: '100%', maxWidth: 500, borderRadius: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">Deja tu puntuación</Typography>
            <Typography variant="subtitle2">Nombre: {auth.name}</Typography>
            <Typography variant="subtitle2">Fecha: {currentDate}</Typography>

            <Box mt={2}>
              <Typography component="legend">Puntuación</Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Box>

            <Box mt={2}>
              <TextField
                label="Descripción"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>

            {error && (
              <Typography color="error" variant="body2" mt={2}>
                {error}
              </Typography>
            )}
          </CardContent>

          <CardActions>
            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
              Enviar Puntuación
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Typography variant="h6" color="error">
          Por favor, inicia sesión para dejar una puntuación.
        </Typography>
      )}
    </Box>
    </>
  )
}
