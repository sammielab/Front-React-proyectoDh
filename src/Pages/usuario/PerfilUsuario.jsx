import React, { useEffect, useState } from 'react'
import useAuth from "../../hooks/useAuth";
import NavBar from '../../Components/Navegacion/NavBar';
import { FormGroup } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { FilledInput } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';
import { Edit } from '@mui/icons-material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {getUserByEmail} from '../../api/getUserByEmail.ts'
import {editUsers} from '../../api/editUsers';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Collapse from '@mui/material/Collapse';

export const PerfilUsuario = () => {
    const {auth,setAuth} = useAuth(); 
    const token = auth.token;
    const [user, setUser] = useState();
    const [userData, setUserData] = useState();
    const [error, setError] = useState({
        "password": {
            "status": false, 
            "msg":''
        }, 
        "mail": {
            "status": false, 
            "msg":''
        }, 

    });
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [showAlert, setShowAlert] = useState({
        "msg":'', 
        "status":Boolean
    });


    const findByEmail = async() => {
        try{
            const data = await getUserByEmail(auth.email, token); 
            setUser(data)
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        findByEmail();
    }, [token])


  
    const handleEditPassword = async() =>{
      
            if(!password){
                setError(prev => ({
                    ...prev,
                    "password": {
                        "status": true, 
                        "msg": 'Debe ingresar un dato'
                    }, 
                }))
            }else{
                setError(prev => ({
                    ...prev,
                    "password": {
                        "status": false, 
                        "msg": ''
                    }}))
            }

            if(password.length < 3){
                setError(prev => ({
                    ...prev,
                    "password": {
                        "status": true, 
                        "msg": 'Debe ingresar una contraseña con mas de 3 caracteres'
                    } 
                }))
            }else{
                setError(prev => ({
                    ...prev,
                    "password": {
                        "status": false, 
                        "msg": ''
                    }}))
            }

            if(user  ){
                setUserData({
                    "id": user.id, 
                    "name": user.name, 
                    "apellido": user.apellido, 
                    "email": user.email,
                    "password": password, 
                    "productosFavoritos":user.productosFavoritos,
                    "puntuaciones":user.puntuaciones, 
                    "role": user.role
                })
            }
            
            if(error.password.status == false){
                try{
                    const data = await editUsers(token, userData);
                    setShowAlert({
                        "msg": 'Su contraseña se ha modificado con éxito', 
                        "status":true
                    })
                    setTimeout(() => {
                        setShowAlert({
                            "msg": '',
                            "status": true
                        });
                    }, 3000);

                    console.log(data)
                    if(data){
                        console.log(data)
                        data.token = token; 
                        setAuth(data)
                    }
                    
                }catch(e){
                
                    setShowAlert({
                        "msg": e.message, 
                        "status": false
                    })

                    setTimeout(() => {
                        setShowAlert({
                            "msg": '',
                            "status": true
                        });
                    }, 3000);
                }
            }
        
    }


    const handleEditMail = async() => {

        if(!email){
            setError(prev => ({
                ...prev,
                "mail":{
                    "status":true,
                    "msg": 'Debe ingresar un mail'
                }
            }))           
        }else{
            setError(prev => ({
                ...prev,
                "mail":{
                    "status":false,
                    "msg": ''
                }
            })) 
        }

        if(email.length < 5){
            setError(prev => ({
                ...prev,
                "mail":{
                    "status":true,
                    "msg": 'Debe ingresar un mail con al menos 5 caracteres'
                }
            })) 
        }else{
            setError(prev => ({
                ...prev,
                "mail":{
                    "status":false,
                    "msg": ''
                }
            })) 
        }

        if(!email.match(new RegExp("^[a-zA-Z0-9_.-]{1,}[@]{1}[a-zA-Z]{1,}[\.]{1}[a-zA-Z]{2,4}([\.]{1}[a-zA-Z]{2,4})?$"))){
            setError(prev => ({
                ...prev,
                "mail":{
                    "status":true,
                    "msg": 'Debe ingresar un mail válido'
                }
            })) 
        }else{
            setError(prev => ({
                ...prev,
                "mail":{
                    "status":false,
                    "msg": ''
                }
            }))
        }

        if(user ){
            setUserData({
                "id": user.id, 
                "name": user.name, 
                "apellido": user.apellido, 
                "email": email,
                "password": user.password, 
                "productosFavoritos":user.productosFavoritos,
                "puntuaciones":user.puntuaciones, 
                "role": user.role
            })
        }

        if(error.mail.status == false){
            try{
                const data =   await editUsers(token, userData);
                setShowAlert({
                  "msg": 'Su email se ha modificado con éxito', 
                  "status":true
               })
               setTimeout(() => {
                setShowAlert({
                    "msg": '',
                    "status": true
                });
            }, 3000);

            console.log(data)
            if(data){
                data.token = token
                setAuth(data);
            }
              }catch(e){
                  setShowAlert({
                      "msg": e.message, 
                      "status": false
                  })

                  setTimeout(() => {
                    setShowAlert({
                        "msg": '',
                        "status": true
                    });
                }, 3000);
              }
        }
        
    }


    const [showNewInput, setShowNewInput] = useState(false);
    const [newData, setNewData] = useState('');
  
    const handleClick = () => {
      setShowNewInput(true);
    };
  
    const handleInputChange = (event) => {
      setNewData(event.target.value);
    };
  
    const handleSubmit = () => {

      console.log('Enviando nuevos datos:', newData);
    
      setShowNewInput(false);
      setNewData('');
    };

  return (
    <>
    <NavBar></NavBar>
    {showAlert.status && (
        <Collapse>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            {showAlert.msg}
            </Alert>
        </Collapse>
    )}


    {showAlert.status === false && (
         <Collapse in={open}>
            <Alert severity="error">{showAlert.msg}</Alert>
        </Collapse>
    )}
        <Container maxWidth='lg'>
            <Card variant="outlined">
                <h3>¡Hola, {auth.name} !</h3>
                <CardContent>
                    <FormGroup>
                        <InputLabel htmlFor="my-input">Nombre</InputLabel>
                        <FilledInput readOnly value={auth.name + ' ' + auth.apellido}></FilledInput>
                    </FormGroup>
                    <FormGroup>
                        <InputLabel htmlFor="my-input">Email</InputLabel>
                        <div className='d-flex'>
                            <div>
                                <FilledInput readOnly value={auth.email}></FilledInput>
                                <Edit onClick={handleClick}></Edit>
                                {showNewInput && (
                                    <Box display="flex" flexDirection="column" gap={2} mt={2} mr={3}>
                                    <TextField
                                        id='email'
                                        type='text'
                                        label="Nuevo mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        variant="filled"
                                        error={error.mail.status}
                                        helperText={error.mail.msg}
                                    />
                                    <Button variant="contained" color="primary" onClick={handleEditMail}>
                                        Enviar
                                    </Button>
                                    </Box>
                                )}
                            </div>
                            <div className='ml-4'>
                                <FilledInput readOnly value="Password" ></FilledInput>
                                <Edit onClick={handleClick} ></Edit>
                                {showNewInput && (
                                    <Box display="flex" flexDirection="column" gap={2} mt={2}>
                                    <TextField
                                        id='password'
                                        label="Nueva Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        variant="filled"
                                        error={error.password.status}
                                        helperText={error.password.msg}
                                    />
                                    <Button variant="contained" color="primary" onClick={handleEditPassword}>
                                        Enviar
                                    </Button>
                                    </Box>
                                )}
                            </div>
                        </div>
                    </FormGroup>
                </CardContent>
            </Card>
        </Container>  
    </>
  )
}
