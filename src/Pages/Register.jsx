import React from 'react'
import {useRef, useState, useEffect} from 'react'; 

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
        console.log(userData)

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
        await fetchProducts();
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
        <div className="container mt-4 text-center" >
            <h3 className='mb-4'>Registro de Usuario</h3>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <span className={validName ? "valid" : "hide"}></span>
                    <span className={validName || !user ? "hide" : "invalid"}></span>
                    <div className="col">
                        <input 
                        type="text" 
                        id='username' 
                        ref={userRef} 
                        autoComplete='off' 
                        onChange={(e) => setUser(e.target.value)} 
                        required 
                        aria-invalid={validName ? "false" : "true"} 
                        aria-describedby="uidnote" 
                        onFocus={() => setUserFocus(true)} 
                        onBlur={() => setUserFocus(false)} 
                        className="form-control" 
                        placeholder="First name"/>
                    </div>
                    {/* <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}> 4 - 24 caracteres.</p> */}
                    <div className="col">
                        <input 
                        type="text" 
                        className="form-control"
                        placeholder="Last name"
                        id='lastname' 
                        ref={lastNameRef} 
                        autoComplete='off' 
                        onChange={(e) => setLastName(e.target.value)} 
                        required 
                        aria-invalid={validLastName ? "false" : "true"} 
                        aria-describedby="uidnote" 
                        onFocus={() =>setLastNameFocus(true)} 
                        onBlur={() => setLastNameFocus(false)} 
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input 
                        type="text" 
                        id='userEmail' 
                        ref={useremail} 
                        autoComplete='off' 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        aria-invalid={validEmail ? "false" : "true"} 
                        aria-describedby="uidnote" 
                        onFocus={() => setEmailFocus(true)} 
                        onBlur={() => setEmailFocus(false)} 
                        className="form-control mt-2" 
                        placeholder="Email"/>
                    </div>
                    
                </div>
                <div className='row'>
                    <div className="col">
                        <input 
                        type="password" 
                        className="form-control mt-2" 
                        id='pwd' 
                        ref={pass} 
                        autoComplete='off' 
                        onChange={(e) => setPwd(e.target.value)} 
                        required 
                        aria-invalid={validPwd ? "false" : "true"} 
                        aria-describedby="uidnote" 
                        onFocus={() => setPwdFocus(true)} 
                        onBlur={() => setPwdFocus(false)} 
                        placeholder="Password"/>
                    </div>
                    <div className="col">
                        <input 
                        type="password" 
                        className="form-control mt-2" 
                        id='matchPass' 
                        ref={matchPass} 
                        autoComplete='off' 
                        onChange={(e) => setmatchPwd(e.target.value)} 
                        required 
                        aria-invalid={validMatchPwd ? "false" : "true"} 
                        aria-describedby="uidnote" 
                        onFocus={() => setMatchPwdFocus(true)} 
                        onBlur={() => setMatchPwdFocus(false)} 
                        placeholder="Password"/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary col-lg-12 mt-4">Registrate</button>
            </form>
            </div>
    </section>
    )}
    </>
  )
}

