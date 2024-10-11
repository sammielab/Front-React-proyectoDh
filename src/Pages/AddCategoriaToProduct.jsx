import React from 'react'
import { useParams } from "react-router-dom"; // Importa useParams
import NavBar from '../Components/NavBar'
import {CheckCategoria} from '../Components/CheckCategoria.jsx'


export const AddCategoriaToProduct = () => {
    const { id } = useParams();
    let token = localStorage.getItem('authToken');

  return (
    <div>
        <NavBar></NavBar>
        <CheckCategoria
        id={id}
        token={token}
        ></CheckCategoria>
    </div>
  )
}
