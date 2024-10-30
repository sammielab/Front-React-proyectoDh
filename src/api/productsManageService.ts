import React from "react";
import { useEffect } from "react";



export const getAllProducts = async () => {
    try{                    
        const response = await fetch('http://localhost:8080/productos/findAll', {
            method: 'GET',
            headers: {
                // 'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
        });
       
        if (!response.ok) {
            throw new Error("Not ok");
        }else{
            const data = await response.json();
            return data; 
        }


    } catch (error) {
        console.error('Error fetching products:', error.message); 
    }

    
}