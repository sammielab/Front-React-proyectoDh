import React from 'react'
import NavBar from '../../../Components/Navegacion/NavBar'
import {AddCaract} from '../../../Components/Caracteristicas/AddCaract.jsx'
import { useParams } from "react-router-dom"; 
import useAuth from '../../../hooks/useAuth';


export const AddCategoria = () => {
  const { id } = useParams();
  const {auth} = useAuth(); 
  let token = auth?.token ;


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