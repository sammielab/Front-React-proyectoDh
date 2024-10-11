import React from "react";
import { useEffect } from "react";



export const saveReserva = async ( token, userData) => {
    try{                    
        const response = await fetch('http://localhost:8080/reservas/save', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Asegúrate de que `token` esté definido
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(userData), 
        });

        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }


        const text = await response.text();
        
        // Verifica si hay contenido antes de intentar parsear
        let data;
        if (text) {
            data = JSON.parse(text);
        } else {
            throw new Error('La respuesta está vacía');
        }

        console.log(data);
        // if (!data.ok) {
        //     throw new Error('No se pudo guardar el producto');
        // }

        return data;


    //         let data = await response.json(); 
    //         console.log(data)
    //         if(!data.ok ){
    //             throw new Error('No se pudo eliminar el producto')
    //         }

    //    // Muestra los datos si es necesario
    //     return data; // Devuelve la respuesta si la necesitas


    } catch (error) {
        console.error('Error fetching products:', error); // Maneja el error aquí
    }

    
}