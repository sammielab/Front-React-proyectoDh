import React from 'react'
import NavBar from '../Components/NavBar'
import {AddCaract} from '../Components/AddCaract.jsx'
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