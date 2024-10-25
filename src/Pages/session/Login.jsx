import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import {authLogin} from '../../api/authLogin';
import {getUserByEmail} from '../../api/getUserByEmail'
import { Box, Card, Typography, TextField, Collapse, Alert } from '@mui/material';

export const Login = () => {
  const {setAuth} = useAuth();  
  const {auth} = useAuth();
  const location = useLocation();
  let from = location.state?.from || '/'
  const navigate = useNavigate();
  const match = from?.pathname?.match(/^\/productos\/(\d+)$/);
  const [errMsg, setErrMsg] = useState('')
  const [success, setsuccess] = useState()
  const [token, setToken] = useState();

  const [userData, setUserData] = useState({
    email: '', 
    password: '',
  })


  const [showAlert, setShowAlert] = useState({
    "msg":'', 
    "status": false
});

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


  useEffect(() => {
    setErrMsg('')
  }, [userData.email, userData.password])


  //Fetch para el auth una vez que el success haya cambiado
  useEffect(() => {
    console.log(success)
    console.log(userData)
    if(success){
    
    const fetch = async(userData) =>{
        try {
          console.log(userData)
            const data = await authLogin(userData); 
            console.log(data)
            if(data){
                    setShowAlert({
                        "msg": '',
                        "status": false
                    });

                   setToken(data.token); 
                   localStorage.setItem('authToken', token);

            }else{
              
                setShowAlert({
                  "msg": 'Login Inválido',
                  "status": true, 
                })  
              
            }
           
        } catch(e){
            console.log(e.message); 
             setShowAlert({
                "msg": e.message,
                "status": true, 
              }) 
        } 
      }
      fetch(userData);
    }
  }, [success]);


  //Cuando el token se haya setteado
  useEffect(() => {

    if(token && userData.email){
    const fetchEmail = async() => {
      
      try {
        if(token){
          const data = await getUserByEmail(userData.email, token); 
          if(data){
            data.token = token; 
            setAuth(data);
            if(match){
              navigate(from);
            }else{
              navigate('/')
            }
         }
         setTimeout(() => {
          setShowAlert({
              "msg": '',
              "status": false
          });
         }, 3000);
        }else{
          setShowAlert({
            "msg": 'Token no disponible. Por favor, inicie sesión nuevamente.',
            "status": true,
          });
        }
        
      }catch(e){
        setErrMsg('Error')

        setShowAlert({
          "msg":e.message, 
          "status":true
        })
      }
    } 
    fetchEmail();
  }

  }, [token])




  //Funcion de submit
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    setError({
      password: { status: false, msg: '' },
      mail: { status: false, msg: '' },
    });
  
    let hasErrors = false;

    //Validaciones
    if(userData.email == '' || !userData.email.match(new RegExp("^[a-zA-Z0-9_.-]{1,}[@]{1}[a-zA-Z]{1,}[\.]{1}[a-zA-Z]{2,4}([\.]{1}[a-zA-Z]{2,4})?$","gi"))){
      hasErrors = true
      setError(prev => ({
        ...prev,
        "mail":{
            "status":true,
            "msg": 'Debe ingresar un mail válido'
        }
    })) 

    }

    if(userData.password == '' || userData.password.length < 6){
      hasErrors = true
      setError(prev => ({
        ...prev,
        "password":{
            "status":true,
            "msg": 'Debe ingresar una contraseña válido'
        }
    })) 
    }

    console.log(success)
   
    if(!hasErrors){
      setsuccess(true)
    }else {
      setsuccess(false);
    } 
        
    };


  return (
<>
    {showAlert.msg && showAlert.status && (
      <Collapse in={showAlert.status}>
        <Alert severity="error">{showAlert.msg}</Alert>
      </Collapse>
    )}

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '25px',
          marginTop: '6rem',
         
        }}
      >
          
          
        <Card
          sx={{
            width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
          }}
        >
      

          <Typography variant="h5" component="div" gutterBottom>
            Login
          </Typography>
  
          <Typography variant="h6">
            {match ? 'El login es obligatorio' : 'Ingrese sus datos'}
          </Typography>
  
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-auto">
              <TextField
                id="email"
                label="Ingrese su mail"
                name="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    email: e.target.value,
                  })
                }
                variant="filled"
                error={error.mail.status}
                helperText={error.mail.msg}
                type="email"
                fullWidth
              />
            </div>
            <div className="col-auto">
              <TextField
                id="password"
                label="Ingrese su contraseña"
                name="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    password: e.target.value,
                  })
                }
                variant="filled"
                error={error.password.status}
                helperText={error.password.msg}
                type="password"
                fullWidth
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3">
                Ingresá
              </button>
            </div>
          </form>
        </Card>
      </Box>
      </>
  )
 
}



