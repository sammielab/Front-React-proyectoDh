import React, { useState, useEffect } from 'react'
import {ProductosContext} from './ProductosContext'



export const ProductosProvider = ({children}) => {
    
    const [products, setProducts] = useState([])
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYWlsQG1haWwuY29tIiwiaWF0IjoxNzI3NDQzNzYwLCJleHAiOjE3Mjg5MTQ5ODl9.XUxLVuehndlOdsRAPQ9SACfKSDMvNpUgU_D3t_8Nzmo"
    
    const fetchProducts = async () => {
      try {
          const response = await fetch('http://localhost:8080/productos/findAll', {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`, // Asegúrate de que `token` esté definido
                  'Content-Type': 'application/json',
              },
          });
  
          if (!response.ok) {
              throw new Error("Not ok");
          }
  
          const data = await response.json(); // Espera a que se resuelva la promesa
          console.log(data); // Verifica los datos recibidos
          setProducts(data); // Actualiza el estado con los productos
  
      } catch (error) {
          console.error('Error fetching products:', error); // Maneja el error aquí
      }
  };
      
    
    useEffect(() => {
        fetchProducts()
    }, [])
    
      return (
          <ProductosContext.Provider value={{products}}>
            {children}
          </ProductosContext.Provider>
      )
    }