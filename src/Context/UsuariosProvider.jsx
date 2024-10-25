import React, { useState, useEffect } from 'react'
import {ProductosContext} from './ProductosContext'
import { useQuery } from 'react-query'
import { getUsers } from '../api/getAllUsers'
import { UsuariosContext } from './UsuariosContext'
import useAuth from '../hooks/useAuth'


export const UsuariosProvider = ({children}) => {
  const {auth} = useAuth(); 
  const token = auth.token;
  
    const {data = [], error } = useQuery(['usuarios'], () => getUsers(token));

      return (
          <UsuariosContext.Provider value={{usuarios: data, error}}>
            {children}
          </UsuariosContext.Provider>
      )
    }