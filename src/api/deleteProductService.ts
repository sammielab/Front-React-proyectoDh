import React from "react";
import { useEffect } from "react";



export const deleteProduct = async (id,token) => {
    console.log(token)
    try{                    
        const response = await fetch(`http://localhost:8080/productos/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
        });

        const contentType = response.headers.get("content-type");
        let data;

        if (contentType && contentType.includes("application/json")) {
            data = await response.json(); 
            if(!data.ok ){
                throw new Error('No se pudo eliminar el producto')
            }
        } else {
            const text = await response.text(); // Lee el cuerpo como texto
            data = { message: text }; // Envuelve en un objeto si es texto plano
        }

        console.log(data); // Muestra los datos si es necesario
        return data.message; // Devuelve la respuesta si la necesitas


    } catch (error) {
        console.error('Error fetching products:', error); 
    }

    
}