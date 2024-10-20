import React from "react";
import { useEffect } from "react";



export const getUserByEmail = async (email, token) => {
    console.log(email)
    console.log(token)
    try{                    
        const response = await fetch(`http://localhost:8080/usuarios/findByEmail?email=${email}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Asegúrate de que `token` esté definido
                'Content-Type': 'application/json',
            },
        });

        console.log(response)
        if (!response.ok) {
            const text = await response.text();
            console.log(text)
            let data; 
    
            if(text){
                data = JSON.parse(text)
            }else{
                throw new Error(text)
            }

              throw new Error("Not ok");
        }else{
            
            try{
                const data = await response.json(); // Espera a que se resuelva la promesa
                console.log(data)
                return data; 

            }catch(e){
                console.log(e.message)
            }
        }

    } catch (error) {
        console.error('Error fetching user:', error.message, error.stack); // Maneja el error aquí
    }

    
}