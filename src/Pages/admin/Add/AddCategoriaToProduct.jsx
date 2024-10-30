import React from 'react'
import { useParams } from "react-router-dom"; // Importa useParams
import NavBar from '../../../Components/Navegacion/NavBar'
import {CheckCategoria} from '../../../Components/Categoria/CheckCategoria.jsx'
import  useAuth  from '../../../hooks/useAuth.jsx';


export const AddCategoriaToProduct = () => {
    const { id } = useParams();
    const {auth } = useAuth();
    let token = auth?.token;

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
