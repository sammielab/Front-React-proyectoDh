import React from 'react'
import {useRef, useState, useEffect} from 'react'; 
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import { FormGroup } from '@mui/material';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/; // Ejemplo de regex para nombre de usuario
const PWD_REGEX = /^[a-zA-Z0-9!@#$%^&*]{6,24}$/;
const REGISTER_URL = '/register'

export const Register = () => {
    
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
        
        const userData = {
            name: userRef.current.value, 
            apellido: lastNameRef.current.value, 
            password: pass.current.value, 
            email: useremail.current.value,
        }


        if(userData.name == undefined || userData.name == '' || userData.name.length < 3){
            setSuccess(false)
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
        if(userData.apellido == undefined || userData.apellido == '' || userData.apellido.length<3){
            setSuccess(false)
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

        if(userData.email == undefined || userData.email == '' || !userData.email.match(new RegExp("^[a-zA-Z0-9_.-]{1,}[@]{1}[a-zA-Z]{1,}[\.]{1}[a-zA-Z]{2,4}([\.]{1}[a-zA-Z]{2,4})?$"))){
            setSuccess(false)
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

        if(userData.password == undefined || userData.password == '' || !userData.password.length < 6){
            setSuccess(false)
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

        if(userData.apellido == matchPwd || userData.password != matchPwd){
            
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

        if(success == true ){
            const fetchProducts = async () => {
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
                    
            
                } catch (e) {
                    console.error('Error fetching products:', e); // Maneja el error aquí
                }
            };

            await fetchProducts();
            navigate('/login');
    
        }

       
        // try{
        //     response = await axios.post(REGISTER_URL, JSON.stringify({user: name, lastname:apellido, email,  pwd:password}), {
        //         headers: {'Content-Type': 'application/json'}, 
        //         withCredentials:true
        //     }
        //     ); 
        //     console.log(JSON.stringify(response))
        //     setSuccess(true)

        // }catch(e){
        //     if(!e?.response){
        //         setErrMsg('No server Response')
        //     }else if (e.response?.status == 409){
        //         setErrMsg('Username Taken'); 
        //     }else{
        //         setErrMsg('Registration Failed')
        //     }
        //     errRef.current.focus(); 
        // }
        
    }


  return (
    <>
    {success ? (
        <section>
            <h1>Success!</h1>
            <p href=""> Sign In</p>
        </section>
    ) : (

    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
        <div className=" mt-6 text-center" >
        <h3 className='mb-4'>Registro de Usuario</h3>
        <Box sx={{ width: '100%' }} >
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
                <button type="submit" className="btn btn-primary col-lg-12 mt-4">Registrate</button>
            </FormControl>
        </Box>
            </div>
    </section>
    )}
    </>
  )
}

