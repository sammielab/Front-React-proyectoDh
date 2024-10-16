import React from "react";
import { useEffect } from "react";



export const getUserById = async (token, id) => {
    try{                    
        const response = await fetch(`http://localhost:8080/usuarios/find/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Asegúrate de que `token` esté definido
                'Content-Type': 'application/json',
            },
        });

        console.log(response)
        if (!response.ok) {
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