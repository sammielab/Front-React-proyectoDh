import React, { useState, useEffect } from 'react'
import {ProductosContext} from './ProductosContext'
import { useQuery } from 'react-query'
import { getUsers } from '../api/getAllUsers'
import { UsuariosContext } from './UsuariosContext'


export const UsuariosProvider = ({children}) => {
   
  const token = localStorage.getItem('authToken')
    const {data = [], error } = useQuery(['usuarios'], () => getUsers(token));

      return (
          <UsuariosContext.Provider value={{usuarios: data, error}}>
            {children}
          </UsuariosContext.Provider>
      )
    }