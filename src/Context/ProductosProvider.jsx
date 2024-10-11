import React, { useState, useEffect } from 'react'
import {ProductosContext} from './ProductosContext'
import { useQuery } from 'react-query'
import { fetchProducts } from '../api/productsService'
import {getAllProducts} from '../api/productsManageService'


export const ProductosProvider = ({children}) => {
  const token = localStorage.getItem('authToken')
    const [postsPerPage, setPostsPerPage] = useState(2)
    const [currentPage, setCurrentPage] = useState(0); // Estado para la página actual
    const {data = [], error } = useQuery(['products', currentPage], () => fetchProducts(currentPage, postsPerPage, token),{keepPreviousData:true});
    const [getTotalPages, setTotalPages] = useState(); 

    const calculatePages = async() => {
      try{
        const products = await getAllProducts(); 
        setTotalPages(products.length / postsPerPage); 
      }catch(e){
        console.error(e)
      }
    }

    useEffect(() => {
      calculatePages();
    }, [data])


      return (
          <ProductosContext.Provider value={{products: data, error, currentPage, setCurrentPage, getTotalPages}}>
            {children}
          </ProductosContext.Provider>
      )
    }