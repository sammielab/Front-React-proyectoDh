import React from "react";
import { useEffect } from "react";



export const getAllProducts = async () => {
    try{                    
        const response = await fetch('http://localhost:8080/productos/findAll', {
            method: 'GET',
            headers: {
                // 'Authorization': `Bearer ${token}`, // Asegúrate de que `token` esté definido
                'Content-Type': 'application/json',
            },
        });
       
        if (!response.ok) {
            throw new Error("Not ok");
        }else{
            const data = await response.json(); // Espera a que se resuelva la promesa
            return data; 
        }


    } catch (error) {
        console.error('Error fetching products:', error.message); // Maneja el error aquí
    }

    
}