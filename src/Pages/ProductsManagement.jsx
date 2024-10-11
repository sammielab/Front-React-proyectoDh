import React, { useState } from 'react'
import {ProductosManageContext} from '../Context/ProductosManageContext'
import NavBar from '../Components/NavBar'
import { useContext, useEffect } from 'react'
import {deleteProduct} from '../api/deleteProductService';
import useAuth from "../hooks/useAuth";
import { getAllProducts } from '../api/productsManageService';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';


export const ProductsManagement = () => {
  const navigate = useNavigate();
  const { products, error } = useContext(ProductosManageContext); // Usa el contexto para obtener los productos
  const queryClient = useQueryClient(); 

  const { auth } = useAuth(); 

  const handleEliminar = async (id) => {
      const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjJAbWFpbC5jb20iLCJpYXQiOjE3Mjc2MzEyOTAsImV4cCI6MTcyOTEwMjUxOX0.rtkPsZ9nin3XDp2wFSWwEolHiG09LrQRa0VD-60T7Go'
      try {
          await deleteProduct(id, token);
          queryClient.invalidateQueries('products'); 
          // Aquí podrías volver a hacer el fetch o invalidar la consulta
          // Si usas React Query, puedes invalidar la consulta
      } catch (error) {
          console.error('Error eliminando el producto:', error);
      }
  }

  if (error) return <div>Error: {error.message}</div>; // Manejo de errores


  const handleAgregarProductos = () =>{
    navigate('/products/add')
  }

  const handleAddCaracteristica = (id) =>{
    navigate(`/products/categoria/add/${id}`)
  }

  const handleCategorias = (id) =>{
    navigate(`/products/categorias/add/${id}`)
  }
   

  return (
    <>
      <NavBar></NavBar>
    
    <div className='container'>
     
        <button onClick={handleAgregarProductos} >Agregar Producto</button>
  
      <table className="table">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Titulo</th>
                <th scope="col">Gestion de Productos</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
            {products.map(product => (
                <tr>
                <td>{product.id}</td>
                <td>{product.titulo}</td>
                <td><button onClick={() => handleEliminar(product.id)} >Eliminar</button>
                <button onClick={()=>handleAddCaracteristica(product.id)}>Editar Caracteristicas</button>
                <button onClick={()=>handleCategorias(product.id)}>Editar Categorias</button>
                </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        {/* <Outlet /> */}
    </>

   
  )
}


