import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/Navegacion/NavBar'
import {getCatalogos} from '../../api/getAllCatalogos'
import {deleteCatalogo} from '../../api/deleteCatalogo'

export const CatalogoPage = () => {

    let token = localStorage.getItem('authToken')
    const [catalogos, setCatalogos] = useState([]); 
   
    const fetch = async() =>{
        try{
           const data =  await getCatalogos(token)
            setCatalogos(data)
        }catch(e){
            console.log(e)
        }
    }
    

    useEffect(() => {
      
     fetch();
   
    }, [token])
    
    fetch();

    const AgregarCatalogo = () => {
        navigate('/catalogos/add')
    }


    const handleEliminar = async(id) =>{
        try{
            await deleteCatalogo(token, id);
        }catch(e){
            console.log(e)
        }
    }

  return (
    <>
        <NavBar/>
        <h3>Catalogos</h3>

        <div className='container'>
     
     <button onClick={AgregarCatalogo} >Agregar Catalogo</button>

   <table className="table">
         <thead>
             <tr>
             <th scope="col">Id</th>
             <th scope="col">Titulo</th>
             <th scope="col">Gestion de Productos</th>
             </tr>
         </thead>
         <tbody className="table-group-divider">
         {catalogos.length > 0 ? (
        catalogos.map(catalogo => (
            <tr key={catalogo.id}> {/* Añadir key aquí */}
                <td>{catalogo.id}</td>
                <td>{catalogo.nombre}</td>
                <td>
                    <button onClick={() => handleEliminar(catalogo.id)}>Eliminar</button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="3">No hay catálogos disponibles.</td> {/* Mensaje alternativo si no hay datos */}
        </tr>
    )}
</tbody>
         </table>
     </div>
    
    </>
  )
}
