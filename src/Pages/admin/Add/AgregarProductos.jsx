import React from 'react'
import {AddProducts} from '../../../Components/Productos/AddProducts'
import NavBar from '../../../Components/Navegacion/NavBar'

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

