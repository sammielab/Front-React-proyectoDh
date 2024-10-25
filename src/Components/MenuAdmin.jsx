import React from 'react'
import { useNavigate } from 'react-router-dom'


const MenuAdmin = () => {
    const navigate = useNavigate();

    const handleUsers = () =>{
        navigate('/usuarios'); 
    }

    const handleProducts = () =>{
        navigate('/products'); 
    }

    const handleCaracteristicas = () =>{
        navigate('/caracteristicas'); 
    }

    const handleCategorias = () =>{
        navigate('/categorias');
    }

  return (
    <>
    <div className='text-center mt-4'>
        <h3 className='light-color'>Menu Administrador</h3>
        <table className="table">
            <tbody>
                <tr>
                    <td><button onClick={handleUsers} className='col-lg-12'>Usuarios</button></td>
                    <td><button  onClick={handleProducts} className='col-lg-12'>Productos</button></td>
                    <td><button  onClick={handleCaracteristicas} className='col-lg-12'>Caracteristicas</button></td>
                    <td><button  onClick={handleCategorias} className='col-lg-12'>Categorias</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    </>
  )
}

export default MenuAdmin
