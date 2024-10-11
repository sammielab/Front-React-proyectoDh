import React from 'react'
import { useParams } from "react-router-dom"; 
import NavBar from '../../Components/NavBar';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import useAuth from "../../hooks/useAuth";
import { findAvaiableProducts } from '../../api/findAvaiableProducts';
import moment from 'moment';
import { List, ListItem, TextField, ListItemText, Typography, ListItemButton } from '@mui/material';
import {findProductById} from '../../api/findProduct';
import { useNavigate } from "react-router-dom";
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import {saveReserva} from '../../api/createReserva';
import { getUserByEmail } from '../../api/getUserByEmail';


export const ReservaPage = () => {
 const { id } = useParams();
 const [checkin, setCheckin] = useState();
 const [checkout, setCheckout] = useState();
 const { auth } = useAuth(); 
 const token = auth.token;
 const [data, setData] = useState([]);
 const [productoDetall, setProductoDetallado] = useState({});
 const [email, setEmail] = useState(); 
 const [reservaData, setReservaData] = useState(); 
 const [success, setsuccess] = useState(); 
 const navigate = useNavigate();
 const [busquedaRealizada, setBusquedaRealizada] = useState(false);
 const [showAlert, setShowAlert] = useState({
  "msg":'', 
  "status":Boolean
});

const [error, setError] = useState({
   "status": false, 
   "msg":''
});

 const handleSubmit = async(e) => {
  e.preventDefault(); 

  if(checkin && checkout){
    const formattedCheckin = moment(checkin).format('YYYY-MM-DD');
    const formattedCheckout = moment(checkout).format('YYYY-MM-DD');

    const response = await fetchProducts(formattedCheckin, formattedCheckout,token)
    if(response != undefined){
      setData(response);
      setBusquedaRealizada(true);
    }
  }
 }

 const fetchProducts = async(formattedCheckin, formattedCheckout,token) =>{
    return await findAvaiableProducts(formattedCheckin, formattedCheckout,token);
 }

 useEffect(() => {
    fetchProducts();
 },[] )

 useEffect(() => {
  if (data.length > 0) {
    console.log('Nuevos productos:', data);

    // Aquí puedes manejar otras acciones cuando data cambie
  } else {
    console.log('No hay productos disponibles.');
  }
}, [data]);


useEffect(() => {
  buscarProductoYFetch(id,data,token);
},[data] )


const buscarProductoYFetch = async (id, data, token) => {

  // Buscar el producto en el array por su id
  const productoEncontrado = data.find((producto) => producto.id == id);

  if (productoEncontrado) {
    const productoDetallado = await findProductById(id, token);
    // Puedes manejar el resultado aquí, como actualizar el estado o mostrarlo en la UI.
    if (productoDetallado) {
      setProductoDetallado(productoDetallado)
      console.log(productoDetall)
      return productoDetallado; // Retorna los detalles si necesitas usarlos.
    } else {
      console.error('No se encontraron detalles para el producto con el id:', id);
    }
  } else {
    console.log('Producto no encontrado en la lista.');
  }
};

const handleChangeProduct = (idSeleccionado) => {
  if(auth.token != undefined){
    navigate(`/productos/${idSeleccionado}/reserva`, { replace: true })
    window.location.reload();
  }else{
    navigate('/login', { state: { from: location.pathname } })
  }
}


const handleReserva = async(e) => {
  e.preventDefault();

    if(email == '' || email == undefined || !email.match(new RegExp("^[a-zA-Z0-9_.-]{1,}[@]{1}[a-zA-Z]{1,}[\.]{1}[a-zA-Z]{2,4}([\.]{1}[a-zA-Z]{2,4})?$","gi"))){
      setsuccess(false);
     
      setError({
            "status":true,
            "msg": 'Debe ingresar un mail válido'
        }) 

      setShowAlert({
        "status": true, 
        "msg": error.msg,
      });
    }else{
      setsuccess(true)
      setError({
        "status":false,
        "msg": ''
    }) 
      setShowAlert({
        "status":false,
        "msg": '', 
      })

      try{

        const userId = await getUserByEmail(auth.email, token)
        if(userId){
          setReservaData ({
            "producto": {"id": id}, 
            "usuario":{
              "id":userId.id,
              "role": auth.role
            }, 
            "check_in": checkin, 
            "check_out": checkout, 
            "estado": "confirmado"
          })
        }

      }catch(e){
        setError({
          "status":true,
          "msg": e,
      }) 

    setShowAlert({
      "status": true, 
      "msg": error.msg,
    });
      }
    }
}

useEffect(() => {
  try{
    const fetchReserva = async() => {
      if(reservaData){
        const rta = await saveReserva(token, reservaData)
        console.log(rta)
        if(rta){
          navigate('/reserva/confirmacion')
        }
      }
    }
    fetchReserva();
  }catch(e){
    console.log(e)
    setError({
      "status":true,
      "msg": e,
  }) 

setShowAlert({
  "status": true, 
  "msg": error.msg,
});
  }

  
} ,[reservaData])


  return (
    
    <>
        <NavBar></NavBar>
        {showAlert.status === true && (
            <Collapse in={open}>
                <Alert severity="error">{showAlert.msg}</Alert>
            </Collapse>
        )}

        <Box component="section"   justifyContent="center" display="flex" 
        alignItems="start"
        bgcolor="#d9cbb8" 
            >
          <Card  
           sx={{ 
            borderRadius: 4, 
            mt:4,
            width: '100%', 
            maxWidth: 400, 
            mx: 'auto', 
            p: 2, // Padding interno para que los DatePickers no estén tan cerca de los bordes
            boxShadow: 3, // Sombra para darle un mejor aspecto a la tarjeta
          }}
            >
            <LocalizationProvider  dateAdapter={AdapterMoment}>
              <Box display="flex" flexDirection="row" gap={2}  justifyContent="center" 
                margin="0 auto">
              <DemoItem label="Chekin">
                <DatePicker value={checkin} onChange={(newValue) => setCheckin(newValue)} />
              </DemoItem>
              <DemoItem label="Checkout">
                <DatePicker value={checkout} onChange={(newValue) => setCheckout(newValue)} />
              </DemoItem>
             <Button onClick={handleSubmit}>Buscar</Button>

              </Box>
          </LocalizationProvider>
          </Card>
        </Box>
        <Box justifyContent="center" textAlign="center" alignContent="center" alignItems="center" display="flex" flexDirection="column" mt={4}>
          
          {productoDetall && productoDetall.titulo  && (
            <Card  sx={{ maxWidth: '80%', borderRadius: 4, padding:2,   margin: '2 auto' }}>
           {busquedaRealizada ? (
              <CardContent mt={2}>
              <Typography variant="h5" gutterBottom>
                {productoDetall.titulo}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {productoDetall.descripcion}
              </Typography>
              <Box
              display="flex" 
              flexDirection="column" 
              justifyContent="center"
              alignContent="center"
              alignItems="center"
              textAlign="center"
              component="form" 
              onSubmit={handleReserva} >
              <Box 
                display="flex" 
                flexDirection="row" 
                justifyContent="center"
                alignContent="center"
                alignItems="center"
                textAlign="center"
                gap={2}
                sx={{ maxWidth: '100%', margin: ' 0 auto', mt:5}}
              >

                <TextField
              
                  slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                label="Checkin"
                value={checkin.format('YYYY-MM-DD')}
                fullWidth 
                />
                <TextField
                  slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                label="Checkout"
                value={checkout.format('YYYY-MM-DD')}
                fullWidth 
                />
                <TextField
                  slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                label="Precio por noche"
                value={productoDetall.precio}
                fullWidth 
                />
              
                
              
                </Box>
                <Box 
                display="flex" 
                flexDirection="row" 
                justifyContent="center"
                alignContent="center"
                alignItems="center"
                textAlign="center"
                gap={2}
                mt={3}
                mb={3}>
                <TextField
                  slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                label="Nombre"
                value={auth.name}
                fullWidth 
                />
                <TextField
                  slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                label="Nombre"
                value={auth.apellido}
                fullWidth 
                />
                <TextField
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                fullWidth 
                />
                
                </Box>
                <Button  fullWidth  variant="contained" color="primary" type="submit">
                Reservar 
                </Button>
              </Box>
            </CardContent>
           ):(
            <Typography>El producto solicitado no cuenta con disponibilidad</Typography>
           )}
         
           </Card>
          
          )}


        </Box>
        {busquedaRealizada && ( 
        <>
            {data && data.length > 0 ? (
            <List>
              <h4>Productos con Disponibilidad</h4>
              {data.map((producto) => (
                <ListItem key={producto.id}>
                  <ListItemButton>
                  <ListItemText primary={producto.titulo} /> 
                  <ListItemText primary={producto.descripcion} /> 
                  <ListItemText primary={producto.precio} /> 
                  <Button onClick={() => handleChangeProduct(producto.id)}>Seleccionar</Button>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" color="error">
              No hay productos disponibles.
            </Typography>
         
          )}
    </>
        )}
        </>
  )
}
