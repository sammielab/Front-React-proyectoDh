import React from "react";
import { useEffect } from "react";



export const fetchProducts = async (page, limit, token) => {
    try{                    
        const response = await fetch(`http://localhost:8080/productos/getAll?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
        });

        console.log(response)
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