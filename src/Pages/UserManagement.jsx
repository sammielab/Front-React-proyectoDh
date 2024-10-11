import React from 'react'
import NavBar from '../Components/NavBar'
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UsuariosContext } from '../Context/UsuariosContext';

const UserManagement = () => {

  const navigate = useNavigate();
  const { usuarios, error } = useContext(UsuariosContext); // Usa el contexto para obtener los productos
  const queryClient = useQueryClient(); 

  const handleEdit = (id) =>{
    navigate(`/usuarios/edit/${id}`);  
    
  }


  return (
    <>
      <NavBar></NavBar>
      <table className="table">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Usuarios</th>
                <th scope="col">Gestion de Usuarios</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
              {usuarios.map(usuario => 
                <tr>
                  <td>{usuario.id}</td>
                  <td>{usuario.name}</td>
                  <td><button onClick={()=>handleEdit(usuario.id)}>Editar Permisos</button></td>
                </tr>
              )}
            </tbody>
            </table>
    </>
  )
}

export default UserManagement
