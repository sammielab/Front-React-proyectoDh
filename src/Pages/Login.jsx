import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { FormGroup } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { useLocation } from 'react-router-dom';

export const Login = () => {
  const {setAuth} = useAuth();  
  const {auth} = useAuth();
  const location = useLocation();
  let from = location.state?.from
  const navigate = useNavigate();
  const match = from.match(/^\/productos\/(\d+)$/);
  console.log(match)

  console.log(from)
  const [userData, setUserData] = useState({
    email: '', 
    password: '',
  })


  const [showAlert, setShowAlert] = useState({
    "msg":'', 
    "status":Boolean
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
  const [errMsg, setErrMsg] = useState('')
  const [success, setsuccess] = useState(true)

  useEffect(() => {
    setErrMsg('')
  }, [userData.email, userData.password])


  useEffect(() => {
    // if (success) {
    //   navigate('/');
    // }
  }, [success, navigate]);

  const handleChange = (e) =>{
    setUserData({
      ...userData,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 


    if(userData.email == '' || !userData.email.match(new RegExp("^[a-zA-Z0-9_.-]{1,}[@]{1}[a-zA-Z]{1,}[\.]{1}[a-zA-Z]{2,4}([\.]{1}[a-zA-Z]{2,4})?$","gi"))){
      setsuccess(false);
      setError(prev => ({
        ...prev,
        "mail":{
            "status":true,
            "msg": 'Debe ingresar un mail válido'
        }
    })) 

    }
    if(userData.password == '' || userData.password.length < 6){
      setsuccess(false);
      setError(prev => ({
        ...prev,
        "password":{
            "status":true,
            "msg": 'Debe ingresar una contraseña válido'
        }
    })) 
    }

    if(success){
      const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    withCredentials:true,
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
              setShowAlert({
                "msg": 'Login Inválido',
                "status": true, 
              })  

              setTimeout(() => {
                setShowAlert({
                    "msg": '',
                    "status": false
                });
               }, 3000);
              throw new Error("Not ok");

            }
    
            const data = await response.json(); // Espera a que se resuelva la promesa
            const token = data.token; 
            localStorage.setItem('authToken', token);
  
            if (token) {
              const email = userData.email
  
              try {
                const response = await fetch(`http://localhost:8080/usuarios/findByEmail?email=${encodeURIComponent(email)}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        withCredentials:true,
                    },
                });
                if (!response.ok) {
                    throw new Error("Not ok");
                }
        
                const data = await response.json(); 
                setAuth({
                  email: data.email,
                  password: data.password,
                  token: token, 
                  name: data.name, 
                  apellido:data.apellido, 
                  role: data.role, 
                  productos_favoritos: data.productosFavoritos,
                  puntuaciones: data.puntuaciones
              })

              if(match){
                navigate(from)
              }else{
                navigate('/')
              }
                
              }catch(e){
                setErrMsg('Error')

                setShowAlert({
                  "msg":e.message, 
                  "status":true
                })

                setTimeout(() => {
                  setShowAlert({
                      "msg": '',
                      "status": false
                  });
                 }, 3000);
              }
            
            } else {
              setErrMsg('Token no encontrado');
              setShowAlert({
                "msg": 'Token no encontrado', 
                "status":true
              })

              setTimeout(() => {
                setShowAlert({
                    "msg": '',
                    "status": false
                });
               }, 3000);
            }
        
           
          } catch (err) {


            console.log(err)
            if(err == true){
              setShowAlert({
                "msg": 'Login Inválido',
                "status": true, 
              })  

              setTimeout(() => {
                setShowAlert({
                    "msg": '',
                    "status": false
                });
               }, 3000);
            }

            if(!err?.response){
              
              setErrMsg('No server response'); 
              setShowAlert({
                "msg": 'No responde el servidor', 
                "status":true
              })

              setTimeout(() => {
                setShowAlert({
                    "msg": '',
                    "status": false
                });
               }, 3000);
            }else if(err.response?.status === 400){
              setErrMsg('Missing info')
              setShowAlert({
                "msg": 'Falta informacion', 
                "status":true
              })

              setTimeout(() => {
                setShowAlert({
                    "msg": '',
                    "status": false
                });
               }, 3000);
            }else if(err.response?.status ===401){
              setErrMsg('Unauthorized') 
              setShowAlert({
                "msg": 'No autorizado', 
                "status":true
              })

              setTimeout(() => {
                setShowAlert({
                    "msg": '',
                    "status": false
                });
               }, 3000);
            }else{
              setErrMsg('Login Failed')

              setShowAlert({
                "msg": 'Login Fallo', 
                "status":true
              })

              setTimeout(() => {
                setShowAlert({
                    "msg": '',
                    "status": false
                });
               }, 3000);
            }
          }
        
    };

    await fetchProducts(); 
    }
  
  

 
  
    //Hacer Validaciones 

  }
  return (
    <section>
      {showAlert.status === true && (
            <Collapse in={open}>
                <Alert severity="error">{showAlert.msg}</Alert>
            </Collapse>
        )}

      <div>
        <h1>
          Login
        </h1>
      </div>

{match &&  (
  <h3>El login es obligatorio</h3>
)}
      <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-auto">
        <label for="staticEmail2" className="visually-hidden">Email</label>
        <TextField
          id='email'
          label="Ingrese su mail"
          name='email'
          value={userData.email}
          onChange={handleChange}
          variant="filled"
          error={error.mail.status}
          helperText={error.mail.msg}
          type='email'
        />

      </div>
      <div className="col-auto">
        <label for="inputPassword2" className="visually-hidden">Password</label>
        <TextField
          id='password'
          label="Ingrese su contraseña"
          name='password'
          value={userData.password}
          onChange={handleChange}
          variant="filled"
          error={error.password.status}
          helperText={error.password.msg}
          type='password'
        />
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-primary mb-3">Ingresá</button>
      </div>
</form>
    </section>
  )
}


