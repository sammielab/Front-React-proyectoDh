import React from "react";
import { useEffect } from "react";



export const editUsers = async (token, userData) => {
    console.log(userData)
    try{                    
        const response = await fetch('http://localhost:8080/usuarios/update', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
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
            const data = await response.json();
            console.log(data); 
            return data; 
        }

    } catch (error) {
        console.error('Error fetching products:', error); 
    }

    
}