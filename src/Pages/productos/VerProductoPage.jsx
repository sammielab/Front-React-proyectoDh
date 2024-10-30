import React, { useState } from 'react'
import NavBar from '../../Components/Navegacion/NavBar'
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { findProductById } from '../../api/findProduct';
import { useParams } from "react-router-dom"; 
import { useEffect } from 'react';
import { Accessible, Elevator, Favorite, FavoriteBorderRounded, FitnessCenter, Garage, Liquor, Pets, Pool, Restaurant, RoomService, SignalWifi3Bar, SmokeFree, Spa, Weekend, Yard } from '@mui/icons-material';
import FavButton from '../../Components/Productos/FavButton'
import useAuth from "../../hooks/useAuth";
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star'; 
import {getUserById} from '../../api/getUserById';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import {findReservaByProducto} from '../../api/findReservaByProductoId';
import { extendMoment } from 'moment-range';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { CustomDay } from '../../Components/CustomDay';
import {ProductIMG} from '../../Components/Productos/ProductIMG';
import { Footer } from '../../Components/Navegacion/Footer';
import { BloqueProductoPoliticas } from './BloqueProductoPoliticas';


export const VerProductoPage = () => {
    const {id} = useParams();
    const [product, setProduct] = useState();
    const { auth } = useAuth(); 
    const token = auth?.token
    const [value, setValue] = React.useState(2);
    const navigate = useNavigate();
    const [productFound, setProductFound] = useState(); 
    const [puntuacionTotal, setPuntuacionTotal] = useState(0); 
    const [selectedDate, setSelectedDate] = useState(null);
    const [reservas, setReservas] = useState([]); 
    const [unavailableDays, setUnavailableDays] = useState(new Set());


    const getProducto = async() => {
        try{
            const data = await findProductById(id,token)
            setProductFound(data); 
           

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

            let puntuacion = 0; 
            const recomendacionesConNombres = await Promise.all(
                productFound.recomendaciones.map(async (recomendacion) => {
                    const puntuacionRecomendacion = recomendacion.puntaje_total; 
                    puntuacion = puntuacion + puntuacionRecomendacion
                    const usuarioIdBuscado = recomendacion.usuario.id;
                    const userData = await getUserById(token, usuarioIdBuscado);
                    recomendacion.usuarioNombre = userData.name;
                    return recomendacion; 
                })

            );
            setPuntuacionTotal((puntuacion ) / productFound.recomendaciones.length)

            productFound.recomendaciones = recomendacionesConNombres;
           
            return productFound; 
        }catch(e){
            console.error(e)
        }
    }

    useEffect(() => {
        const findDisponibilidad = async () => {
            try{
                const data = await findReservaByProducto(id, token); 
                console.log(data)

                if(data){
                    const reservasConMoment = data.map(reserva => ({
                        check_in: moment(reserva.check_in),
                        check_out: moment(reserva.check_out)
                    }));

                    const daysObj = {};
                    reservasConMoment.forEach(reserva => {
                        const start = moment(reserva.check_in);
                        const end = moment(reserva.check_out);
                        while (start.isBefore(end) || start.isSame(end)) {
                            daysObj[start] = true; // Marcar la fecha como no disponible
                            start.add(1, 'days');
                        }
                    });
                    console.log(daysObj)
                    setUnavailableDays(daysObj);
                    setReservas(reservasConMoment);

                }
               
            }catch(e){
                console.log(e.message)
            }
        }
        findDisponibilidad();
    }, [id, token])
  


    const isDateUnavailable = (date) => {
        console.log(date)
        return unavailableDays.has(date.format('YYYY-MM-DD'));
    };
 


    useEffect(() => {

        const puntuacionConUsuarioNombre = async () => {
            if (productFound) {
                const rta = await findUserName(); // Sin pasar productFound, ya que la función lo utiliza directamente
                setProduct(rta);
            }
        }

        puntuacionConUsuarioNombre();
     
    }, [productFound])


  
 

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
                <Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'Center' }}>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 24 }}>
                            {product.titulo}
                        </Typography>
                    {auth && auth.token && (
                        <CardActions>
                            <FavButton id={product.id}></FavButton>
                        </CardActions>
                     ) }
                    </Box>
                </Box>
             
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
                <hr />

            <ProductIMG
            imgdtos={product.imgdtos}
            idProducto={id}
            ></ProductIMG>
   
   {/* Calendar  */}
   <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateCalendar showDaysOutsideCurrentMonth 
          slots={{
            day: (dayProps) => <CustomDay {...dayProps} unavailableDays={unavailableDays} />,
            }}
          />
        </LocalizationProvider>

                <Button onClick={handleReserva}>Reservar</Button>

                
             
                   
                    <Card sx={{ marginTop: 2, padding: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                        Recomendaciones de Usuarios
                        </Typography>

                        { !isNaN(puntuacionTotal) && puntuacionTotal && (
                            <Typography  variant="h6"> Puntuacion total : {puntuacionTotal}</Typography>
                        )}

                        <List>
                        <Typography> Total de valoraciones : {product.recomendaciones.length} </Typography>
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
                                        {recommendation.usuarioNombre}
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
        {product && product.politicas && (
            <BloqueProductoPoliticas
            politicas={product.politicas}
            ></BloqueProductoPoliticas>
        )}
            
        </Card>
    </Box>
    <Footer></Footer>
    </>
  )
}
