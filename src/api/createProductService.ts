import React from "react";
import { useEffect } from "react";



export const saveFetch = async ( token, userData) => {
 
    try{                    
        const response = await fetch('http://localhost:8080/productos/save', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(userData), 
        });

        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }


        const text = await response.text();
        

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

   
    //     return data; // Devuelve la respuesta si la necesitas


    } catch (error) {
        console.error('Error fetching products:', error); 
    }

    
}