import React from 'react'
import NavBar from '../../../Components/Navegacion/NavBar'
import { useParams } from "react-router-dom"; // Importa useParams
import {CategoriasAddItem} from '../../../Components/Categoria/CategoriasAddItem.jsx'

export const CategoriaAdd = () => {

    let token = localStorage.getItem('authToken');

  return (
    <>
    <NavBar></NavBar>
    <CategoriasAddItem></CategoriasAddItem>
    
    </>
  )
}


