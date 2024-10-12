import React, { useState, useEffect } from 'react';
import {fetchCaracteristicas} from '../../api/fetchCaracteristicas';
import {deleteCaracteristica} from '../../api/deleteCaracteristica'
import NavBar from '../../Components/Navegacion/NavBar'
import { useNavigate } from 'react-router-dom'


export const CaracteristicasPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const [caracteristicas, setCaracteristicas] = useState([]);

    const getCaracteristicas = async() => {
        try{
            const data = await fetchCaracteristicas(token); 
            setCaracteristicas(data)
        }catch(e){
            console.log(e)
        }
      }
    
      useEffect(() => {
        getCaracteristicas();
      }, [])
      
      const handleEliminar = async(id) => {

        try{
            const data = await deleteCaracteristica(token, id)
            getCaracteristicas();

        }catch(e){
            console.log(e)
        }
      }

      const handleAdd = () => {
        navigate('/caracteristicas/add');
      }

  return (
    <>
        <NavBar></NavBar>
        <div className='container mt-4'>
        <button onClick={handleAdd}>Agregar</button>
            {caracteristicas && caracteristicas.length > 0 ? (
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Gestion</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                {caracteristicas.map(c => 
                    <tr>
                    <td>{c.id}</td>
                    <td>{c.nombre}</td>
                    <td><button onClick={()=>handleEliminar(c.id)} >Eliminar</button></td>
                    </tr>
                )}
                </tbody>
                </table>
        ): (
            <p>No hay caracteristicas disponibles</p>
            )}
            </div>
        
    </>
  )
}
