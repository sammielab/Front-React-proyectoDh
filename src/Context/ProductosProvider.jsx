import React, { useState, useEffect } from 'react'
import {ProductosContext} from './ProductosContext'



export const ProductosProvider = ({children}) => {
    
    const [products, setProducts] = useState([])
    
    
    const fetchProducts = async () => {
           try{
                const response = await fetch('https://fakestoreapi.com/products')
                const data = await response.json()
                setProducts(data)
             }catch(error){
               console.log(error)
             }
    }
      
    
    useEffect(() => {
        fetchProducts()
    }, [])
    
      return (
          <ProductosContext.Provider value={{products}}>
            {children}
          </ProductosContext.Provider>
      )
    }