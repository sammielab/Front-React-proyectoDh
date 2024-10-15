import React, { useState, useEffect } from 'react'
import useAuth from "../hooks/useAuth";
import { findReservaByUser } from '../api/getReservasByUser';
import { getUserByEmail } from '../api/getUserByEmail';
import { Box, List, ListItem, ListItemText, ListItemIcon, Typography, CircularProgress, Card, Button, ListItemButton } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel'; // Un ícono representativo, por ejemplo.
import {findProductById} from '../api/findProduct';
import { useNavigate } from 'react-router-dom';

export const ReservasComponent = () => {

    const navigate = useNavigate()
    const [reservas, setReservas] = useState([]);
    const [error, setError] = useState();
    const {auth} = useAuth();
    const token = auth.token
    const [loading, setLoading] = useState(true);
    const [userId, setuserId] = useState(); 
    const [reservasConProductos, setReservasConProductos] = useState();

    console.log(auth.email)

    const fetchUserByEmail = async() => {
        try {
            const data = await getUserByEmail(auth.email, token)
             if(data){
                setuserId(data)
             }
            }catch(e){
                console.log(e.message)
            }
    }

    useEffect(() => {
        fetchUserByEmail();
    }, [])

    const fetchReservas = async () => {
        try {
              const response = await findReservaByUser(userId.id, token)
              setReservas(response);
          
        } catch (err) {
        //   setError(err.message);
        console.log(setError)
        }finally {
            setLoading(false);
          }
      };


      useEffect(() => {
        fetchReservas();
      }, [userId]);


      const fetchProducById = async (idToFind, token) => {
        try{
            const rta = await findProductById(idToFind, token); 
            return rta            
        }catch(e){
            console.log(e)
        }
      }
      

      useEffect(() => {

        const fetchAllProducts = async() => {
            const updateReserva = await Promise.all (
                reservas.map(async (res) => {
                    let idToFind = res.id; 
                    let productFound = await fetchProducById(idToFind, token); 

                    return {...res, producto:productFound}; 
                })
            ); 
            setReservasConProductos(updateReserva); 
        }
       
        fetchAllProducts();
      }, [reservas])

      console.log(reservasConProductos)


      const handlePuntuar = (id) => {
        navigate(`/puntuar/reserva/${id}`)
      }

  return (
    <>
     <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{ width: '100%', maxWidth: 600, margin: '0 auto', mt: 4 }}
    >
      <Typography variant="h5" gutterBottom>
        Lista de Reservas
      </Typography>

      {loading  && reservasConProductos ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : reservasConProductos && reservasConProductos.length > 0 ? (
        <Card sx={{ width: '100%', borderRadius: 4, padding: 2 }}>
          <List>
            {reservasConProductos.map((reserva) => (
              <ListItem divider>
                <ListItemIcon>
                  <HotelIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                    primary={`Checkin: ${reserva.check_in}`}
                //   primary={`Reserva de ${reserva.nombreCliente}`}
                //   secondary={`Fecha: ${reserva.fecha} - Habitación: ${reserva.habitacion}`}
                />
                <ListItemText
                    primary={`Checkout: ${reserva.check_out}`}
                />
                <ListItemText
                    primary={`Fecha de reserva: ${reserva.fecha_reserva}`}
                />
                <ListItemText
                    primary={`A nombre de: ${auth.name} ${auth.apellido}`}
                />
                <ListItemText
                    primary={`Producto: ${reserva.producto.titulo}`}
                />
                <ListItemButton
                onClick={()=>handlePuntuar(reserva.producto.id)} 
               >Puntuar</ListItemButton>
              </ListItem>
            ))}
          </List>
        </Card>
      ) : (
        <Typography>Ud. aún no realizo una reserva.</Typography>
      )}
    </Box>
    </>


  )
}
