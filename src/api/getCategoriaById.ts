import React from "react";
import { useEffect } from "react";



export const getCategoriaById = async (id, token) => {
    try{                    
        const response = await fetch(`http://localhost:8080/categorias/find/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Not ok");
        }else{
            const data = await response.json();
            console.log(data); 
            return data; 
        }


    } catch (error) {
        console.error('Error fetching products:', error); 
    }

    
}