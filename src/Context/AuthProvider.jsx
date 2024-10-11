import {  useState, useEffect } from "react";
import React from 'react'
import { AuthContext } from "./AuthContext";


export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(() =>{
        const storedAuth = localStorage.getItem('auth');
        return storedAuth ? JSON.parse(storedAuth) : {};
    });


    useEffect(() => {
        if (auth && Object.keys(auth).length !== 0) {
            localStorage.setItem('auth', JSON.stringify(auth));
        } else {
            localStorage.removeItem('auth'); // Si no hay auth, lo eliminamos
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

