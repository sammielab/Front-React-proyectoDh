import React from 'react'
import NavBar from '../../../Components/Navegacion/NavBar'
import {AddCaract} from '../../../Components/Caracteristicas/AddCaract.jsx'
import { useParams } from "react-router-dom"; 


export const AddCategoria = () => {
  const { id } = useParams();
  let token = localStorage.getItem('authToken');


  return (
    <>
    <NavBar></NavBar>
    <AddCaract
    id={id}
    token={token}
    ></AddCaract>
    </>
  )
}