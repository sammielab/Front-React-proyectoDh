import React, { useState } from 'react'
import NavBar from '../../Components/Navegacion/NavBar'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { findProductById } from '../../api/findProduct';
import { useParams } from "react-router-dom"; 
import { useEffect } from 'react';
import { Accessible, Elevator, Favorite, FavoriteBorderRounded, FitnessCenter, Garage, Liquor, Pets, Pool, Restaurant, RoomService, SignalWifi3Bar, SmokeFree, Spa, Weekend, Yard } from '@mui/icons-material';
import FavButton from '../../Components/FavButton'
import useAuth from "../../hooks/useAuth";
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';


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
            console.log(data)
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

                        <Typography component="legend">Puntuar</Typography>
                        <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                        />
                    </Box>
                ) }
                
            </CardContent>
        )}
      
        </Card>
    </Box>
    </>
  )
}
