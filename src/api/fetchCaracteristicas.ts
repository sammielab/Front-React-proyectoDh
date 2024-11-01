import React from "react";
import { useEffect } from "react";



export const fetchCaracteristicas = async (token) => {

    try{                    
        const response = await fetch('http://localhost:8080/caracteristicas/findAll', {
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
            const data = await response.json(); // Espera a que se resuelva la promesa
            console.log(data)
            return data; 
        }

    } catch (error) {
        console.error('Error fetching products:', error); // Maneja el error aquí
    }

    
}