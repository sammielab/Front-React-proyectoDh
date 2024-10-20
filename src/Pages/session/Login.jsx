import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { FormGroup } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { useLocation } from 'react-router-dom';
import {authLogin} from '../../api/authLogin';
import {getUserByEmail} from '../../api/getUserByEmail'

export const Login = () => {
  const {setAuth} = useAuth();  
  const {auth} = useAuth();
  const location = useLocation();
  let from = location.state?.from || '/'
  const navigate = useNavigate();
 console.log(location)
 console.log(from)
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


  useEffect(() => {
    setErrMsg('')
  }, [userData.email, userData.password])


  //Fetch para el auth una vez que el success haya cambiado
  useEffect(() => {

   if(success){
    const fetch = async(userData) =>{
        try {
            const data = await authLogin(userData); 
            if(data){

              setTimeout(() => {
                    setShowAlert({
                        "msg": '',
                        "status": false
                    });
                   }, 3000);

                   setToken(data.token); 
                   localStorage.setItem('authToken', token);

            }else{
              setTimeout(() => {
                setShowAlert({
                  "msg": 'Login Inválido',
                  "status": true, 
                })  
              },3000);
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

    if(userData){
    const fetchEmail = async() => {
      
      try {
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

    console.log("LLega al submit")
    //Validaciones
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

    if(success != false){
      setsuccess(true)
    } 
        
    };


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

{match ?  (
  <h3>El login es obligatorio</h3>
): (
  <h3>Ingrese sus datos</h3>
)}
      <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-auto">
        <label for="staticEmail2" className="visually-hidden">Email</label>
        <TextField
          id='email'
          label="Ingrese su mail"
          name='email'
          value={userData.email}
          onChange={(e) => setUserData({
            ...userData,
            email: e.target.value
          })}
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
          onChange={(e)=>setUserData({
            ...userData,
            password: e.target.value
          })}
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



