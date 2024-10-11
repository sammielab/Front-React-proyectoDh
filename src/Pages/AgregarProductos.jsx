import React from 'react'
import {AddProducts} from '../Components/AddProducts'
import NavBar from '../Components/NavBar'

export const AgregarProductos = () => {


  return (
    <>
        <NavBar></NavBar>
    <div className='container'>
        <h1>Agregar Productos</h1>
      <AddProducts
      ></AddProducts>
    </div>
    </>
  )
}

