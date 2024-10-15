import React, { useState } from 'react'
import NavBar from '../../Components/Navegacion/NavBar'
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { findProductById } from '../../api/findProduct';
import { useParams } from "react-router-dom"; 
import { useEffect } from 'react';
import { Accessible, Elevator, Favorite, FavoriteBorderRounded, FitnessCenter, Garage, Liquor, Pets, Pool, Restaurant, RoomService, SignalWifi3Bar, SmokeFree, Spa, Weekend, Yard } from '@mui/icons-material';
import FavButton from '../../Components/FavButton'
import useAuth from "../../hooks/useAuth";
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star'; 
import {getUserById} from '../../api/getUserById';


export const VerProductoPage = () => {
    const {id} = useParams();
    const [product, setProduct] = useState();
    const token = localStorage.getItem('authToken')
    const { auth } = useAuth(); 
    const [value, setValue] = React.useState(2);
    const navigate = useNavigate();


    const getProducto = async() => {
        try{
            const data = await findProductById(id,token); 
            setProduct(data)

        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getProducto();
    }, [id])
    

    const getIconByCaracteristic = (name) => {
        switch (name.toLowerCase()) {
            case 'mascotas':
              return <Pets />;
            case 'gym':
              return <FitnessCenter />;
            case 'sum':
              return <Weekend />;
            case 'pileta':
              return <Pool />;
            case 'estacionamiento gratuito': 
                return <Garage></Garage>
            case 'spa':
                return <Spa></Spa>
            case 'recepcion': 
                return <Concierge></Concierge>
            case 'wifi': 
                return <SignalWifi3Bar></SignalWifi3Bar>
            case 'limpieza': 
                return <RoomService></RoomService>
            case 'habitaciones no fumadores': 
                return <SmokeFree></SmokeFree>
            case 'ascensor': 
                return <Elevator></Elevator>
            case 'restaurante': 
                return <Restaurant></Restaurant>
            case 'sauna': 
                return <Sauna></Sauna>
            case 'jardin': 
                return <Yard></Yard>
            case 'mini-bar': 
                return <Liquor></Liquor>
            case 'accesibilidad': 
                return <Accessible></Accessible>
            default:
              return ; // Ícono por defecto si no coincide ninguna categoría
          }
    }

    const handleReserva = () => {
        if(auth.token != undefined){
            navigate(`/productos/${id}/reserva`)
        }else{
            navigate('/login', { state: { from: location.pathname } })
        }
    }


    const findUserName = async() => {
        try{

            const recomendacionesConNombres = await Promise.all(
                product.recomendaciones.map(async (recomendacion) => {
                    const usuarioIdBuscado = recomendacion.usuario_id;
                    const userData = await getUserById(token, usuarioIdBuscado);
                    console.log(userData)
                    recomendacion.usuarioNombre = userData.nombre; // Guardamos el nombre en la recomendación
                    return recomendacion; // Retornamos la recomendación actualizada
                })
            );
            product.recomendaciones = recomendacionesConNombres;
            console.log(product)
            return product; 
        }catch(e){
            console.error(e)
        }
    }

    useEffect(() => {
        findUserName(product); 
    }, [product])

    


  return (
    <>
    <NavBar></NavBar>
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
    >
        <Card sx={{ width: '80%', textAlign: 'center', justifyItems: 'center' }}>
            {product && (
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 24 }}>
                    {product.titulo}
                </Typography>
                <Typography variant="h5" component="div">
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{product.descripcion}</Typography>
                <Typography variant="body2">
                   precio por noche: $ {product.precio}
                </Typography>
                <br />
                <Typography variant='body3'>
                    Caracteristicas:
                </Typography>
                {product.caracteristicas && product.caracteristicas.map((caracteristica, index) => (
                    <Typography key={index} variant="body2">
                      {getIconByCaracteristic(caracteristica.nombre)}   {caracteristica.nombre}
                    </Typography>
                ))}

                <Button onClick={handleReserva}>Reservar</Button>

                {auth && auth.token && (
                    <Box>
                        <CardActions>
                            <FavButton id={product.id}></FavButton>
                        </CardActions>

                       
                    </Box>
                ) }
                
                <Card sx={{ marginTop: 2, padding: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                        Recomendaciones de Usuarios
                        </Typography>

                        <List>
                        {product.recomendaciones.map((recommendation, index) => (
                            <React.Fragment key={index}>
                            <ListItem alignItems="flex-start">
                                <ListItemIcon>
                                <StarIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                primary={
                                    <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body1" fontWeight="bold">
                                        {recommendation.usuario_id}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {new Date(recommendation.fecha_publicacion).toLocaleDateString()}
                                    </Typography>
                                    </Box>
                                }
                                secondary={
                                    <>
                                    <Typography variant="body2" color="textSecondary">
                                        Puntuación: {recommendation.puntaje_total} / 5
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                                        {recommendation.descripcion}
                                    </Typography>
                                    </>
                                }
                                />
                            </ListItem>
                            {index < product.recomendaciones.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                        </List>

                        {product.recomendaciones.length === 0 && (
                        <Typography variant="body2" color="textSecondary">
                            No hay recomendaciones disponibles.
                        </Typography>
                        )}
                    </CardContent>
                    </Card>
            </CardContent>
        )}
      
        </Card>
    </Box>
    </>
  )
}
