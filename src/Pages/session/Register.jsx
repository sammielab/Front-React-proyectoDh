import React from 'react'
import {useRef, useState, useEffect} from 'react'; 
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { Box, Button, Grid, Card, CardContent, Typography } from '@mui/material';
import { FormGroup } from '@mui/material';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/; // Ejemplo de regex para nombre de usuario
const PWD_REGEX = /^[a-zA-Z0-9!@#$%^&*]{6,24}$/;
const REGISTER_URL = '/register'

export const Register = () => {
    const navigate = useNavigate()
    const userRef = useRef(); 
    const lastNameRef = useRef();
    const pass = useRef();
    const matchPass = useRef();
    const useremail = useRef();
    const errRef = useRef(); 

    const [user, setUser] = useState('');
    const [lastname, setLastName] = useState('');
    const [validName, setValidName] = useState(false); 
    const [validLastName, setValidLastName] = useState(false); 
    const [userFocus, setUserFocus] = useState(false); 
    const [lastNameFocus, setLastNameFocus] = useState(false); 
    const [error, setError] = useState({
        "name":{
            "status": false, 
            "msg": ''
            },
        "apellido": {
            "status": false, 
            "msg": ''
        }, 
        "mail":{
            "status": false, 
            "msg": ''
        }, 
        "pass":{
            "status": false, 
            "msg": ''
        }, 
        "checkPass":{
            "status": false, 
            "msg": ''
        }
    })

    const [pwd, setPwd] = useState(''); 
    const [validPwd, setValidPwd] = useState(false); 
    const [pwdFocus, setPwdFocus] = useState(false); 

    const [matchPwd, setmatchPwd] = useState(''); 
    const [validMatchPwd, setValidMatchPwd] = useState(false); 
    const [matchPwdFocus, setMatchPwdFocus] = useState(false); 

    const [email, setEmail] = useState(''); 
    const [validEmail, setValidEmail] = useState(false); 
    const [emailFoscus, setEmailFocus] = useState(false); 

    const [errMsg, setErrMsg] = useState(''); 
    const [success, setSuccess] = useState(false); 

    const [userData, setUserData] = useState();

    useEffect(() => {
        userRef.current.focus();
    }, [])


    useEffect(() => {
        const result = USER_REGEX.test(user); 
        // console.log(result)
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = USER_REGEX.test(lastname); 
        // console.log(result)
        setValidLastName(result);
    }, [lastname])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        // console.log(result); 
        setValidPwd(result); 
        const match = pwd === matchPwd; 
        setValidMatchPwd(match);

    }, [pwd,matchPwd])

    useEffect(() => {
        setErrMsg(''); 

    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) =>{
        e.preventDefault(); 
        
      

        let hasError = false; 

        if(user == undefined || user == '' || user.length < 3){
            hasError = true; 
            setError(prev => ({
                ...prev,
                "name":{
                    "msg": 'Ingrese un nombre válido', 
                    "status": true
                }
            }))
        }else{
            setError(prev => ({
                ...prev,
                "name":{
                    "msg": '', 
                    "status": false
                }
            }))
        }
        if(lastname == undefined || lastname == '' || lastname.length<3){
            hasError = true
            setError(prev => ({
                ...prev,
                "apellido":{
                    "msg": 'Ingrese un apellido válido', 
                    "status": true
                }
            }))
        }else{
            setError(prev => ({
                ...prev,
                "apellido":{
                    "msg": '', 
                    "status": false
                }
            }))
        }

        if( email == undefined ||  email == '' || !email.match(new RegExp("^[a-zA-Z0-9_.-]{1,}[@]{1}[a-zA-Z]{1,}[\.]{1}[a-zA-Z]{2,4}([\.]{1}[a-zA-Z]{2,4})?$"))){
           hasError = true
           setError(prev => ({
                ...prev,
                "mail":{
                    "msg": 'Ingrese un mail válido', 
                    "status": true
                }
            }))
        }else{
            setError(prev => ({
                ...prev,
                "mail":{
                    "msg": '', 
                    "status": false
                }
            }))
        }

        if(pwd == undefined || pwd == '' || pwd.length < 6){
            hasError = true
            setError(prev => ({
                ...prev,
                "pass":{
                    "msg": 'Ingrese una contraseña válida', 
                    "status": true
                }
            }))
        }else{
            setError(prev => ({
                ...prev,
                "pass":{
                    "msg": '', 
                    "status": false
                }
            }))
        }

        if( pwd != matchPwd){
            hasError = true
            setError(prev => ({
                ...prev,
                "checkPass":{
                    "msg": 'Ingrese una contraseña válida', 
                    "status": true
                }
            }))
        }else{
            setError(prev => ({
                ...prev,
                "checkPass":{
                    "msg": '', 
                    "status": false
                }
            }))
        }

        if(!hasError){
           setSuccess(true)
           setUserData({
            name: user, 
            apellido: lastname, 
            password: pwd, 
            email: email,
            })
        }

       
  
    }

    useEffect(() => {
        console.log("llega bien")
        console.log(success)
        console.log(userData)
        if(success && userData){
            const fetchProducts = async (userData) => {
                try {
                    const response = await fetch('http://localhost:8080/auth/register', {
                        method: 'POST',
                        headers: {
                            // 'Authorization': , // Asegúrate de que `token` esté definido
                            'Content-Type': 'application/json',
                            withCredentials:true,
                        },
                        body: JSON.stringify(userData)
                    });
                    console.log(response)
                    if (!response.ok) {
                        throw new Error("Not ok");
                    }
            
                    const data = await response.json(); // Espera a que se resuelva la promesa
                    console.log(data); // Verifica los datos recibidos
                    navigate('/login');
            
                } catch (e) {
                    console.error('Error fetching products:', e); // Maneja el error aquí
                }
            };
             fetchProducts(userData);
            
        }
    }, [success, userData])


  return (
    <>
    {success ? (
        <section>
            <h1>Registro Exitoso!</h1>
            <p href=""> Sign In</p>
        </section>
    ) : (

    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
        <div className=" mt-6 text-center" >
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', borderRadius: '25px', marginTop:'6rem' }}>
            <Card
             sx={{
                width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
                maxWidth: '600px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', 
                alignContent:'center',
                textCenter: 'center', 
                alignItems: 'center',
                padding: '2rem'}}>
        <Typography >Registro de Usuario</Typography>
                <FormControl sx={{ width: '50%' }}  onSubmit={handleSubmit}>
                    <FormGroup >
                        <span className={validName ? "valid" : "hide"}></span>
                        <span className={validName || !user ? "hide" : "invalid"}></span>
                    
                        <TextField
                            id='username'
                            ref={userRef} 
                            autoComplete='off' 
                            onChange={(e) => setUser(e.target.value)} 
                            label="Nombre"
                            aria-invalid={validName ? "false" : "true"} 
                            aria-describedby="uidnote" 
                            onFocus={() => setUserFocus(true)} 
                            onBlur={() => setUserFocus(false)} 
                            error={error.name.status}
                            helperText={error.name.msg}
                        />
                    
                        {/* <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}> 4 - 24 caracteres.</p> */}
                    
                        <TextField
                            label="Apellido"
                            error={error.apellido.status}
                            helperText={error.apellido.msg}
                            type="text" 
                            id='lastname' 
                            ref={lastNameRef} 
                            autoComplete='off' 
                            onChange={(e) => setLastName(e.target.value)} 
                            aria-invalid={validLastName ? "false" : "true"} 
                            aria-describedby="uidnote" 
                            onFocus={() =>setLastNameFocus(true)} 
                            onBlur={() => setLastNameFocus(false)} 
                        />
                    </FormGroup>
                
                <FormGroup>
                        <TextField
                            label="Email"
                            type="text" 
                            id='userEmail' 
                            ref={useremail} 
                            autoComplete='off' 
                            onChange={(e) => setEmail(e.target.value)} 
                            aria-invalid={validEmail ? "false" : "true"} 
                            aria-describedby="uidnote" 
                            onFocus={() => setEmailFocus(true)} 
                            onBlur={() => setEmailFocus(false)} 
                            error={error.mail.status}
                            helperText={error.mail.msg}
                        />
                        <TextField
                            error={error.pass.status}
                            helperText={error.pass.msg}
                            id='pwd' 
                            ref={pass} 
                            autoComplete='off' 
                            onChange={(e) => setPwd(e.target.value)} 
                            aria-invalid={validPwd ? "false" : "true"} 
                            aria-describedby="uidnote" 
                            onFocus={() => setPwdFocus(true)} 
                            onBlur={() => setPwdFocus(false)} 
                            label="Contraseña"
                        />
                        
                    
                    
                        <TextField
                            error={error.checkPass.status}
                            helperText={error.checkPass.msg}
                            type="password" 
                            id='matchPass' 
                            ref={matchPass} 
                            value={matchPwd}
                            autoComplete='off' 
                            onChange={(e) => setmatchPwd(e.target.value)} 
                            aria-invalid={validMatchPwd ? "false" : "true"} 
                            aria-describedby="uidnote" 
                            onFocus={() => setMatchPwdFocus(true)} 
                            onBlur={() => setMatchPwdFocus(false)} 
                            label="Confirmar Contraseña"
                        />
                    </FormGroup>
                    <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-primary col-lg-12 mt-4">Registrate</button>
                </FormControl>
            </Card>
        </Box>
            </div>
    </section>
    )}
    </>
  )
}

