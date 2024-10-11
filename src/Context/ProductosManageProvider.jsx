import React, { useState, useEffect } from 'react'
import {ProductosManageContext} from './ProductosManageContext'
import { useQuery } from 'react-query'
import { getAllProducts } from '../api/productsManageService'


export const ProductosManageProvider = ({children}) => {
    const {data = [], error } = useQuery(['products'], () => getAllProducts(),{keepPreviousData:true});

      return (
          <ProductosManageContext.Provider value={{products: data, error, getAllProducts}}>
            {children}
          </ProductosManageContext.Provider>
      )
    }