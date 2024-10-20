import React, { useState, useEffect } from 'react';
import NavBar from '../../../Components/Navegacion/NavBar'
import { useNavigate } from 'react-router-dom'
import {deleteCategoria} from '../../../api/deleteCategoria'
import { getCategorias } from '../../../api/getCategorias';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { PriorityHigh } from '@mui/icons-material';
import DialogContentText from '@mui/material/DialogContentText';
import { Box, Button, Grid, Card, CardContent, Typography } from '@mui/material';
import useAuth from '../../../hooks/useAuth';


export const CategoriasPage = () => {

    const navigate = useNavigate();
    const {auth} = useAuth();
    const token = auth.token
    const [categorias, setCategorias] = useState([]);
   

    const fetchCategorias = async() => {
        try{
            const data = await getCategorias(token); 
            setCategorias(data)
        }catch(e){
            console.log(e)
        }
      }

      useEffect(() => {
        fetchCategorias();
      }, [])

      const [open, setOpen] = useState(false);
      const [infoDialogo, setInfoDialogo] = useState();

      
        
      
        const handleListItemClick = (value) => {
          onClose(value);
        };
    
        const [idEliminar, setIdEliminar] = useState();

        const handleClickOpen = (id, nombre) => {
            setInfoDialogo(nombre);
            setIdEliminar(id)
            setOpen(true);

          };
        
          const handleClose = (value) => {
            setOpen(false);
          };
      
          const handleConfirm = (id) => {
            handleEliminar(id);
            handleClose();
          }

    const handleEliminar = async() => {

        try{
            const data = await deleteCategoria(token, idEliminar)
            fetchCategorias();
            setIdEliminar(null)

        }catch(e){
            console.log(e)
        }
    }


    const handleDelete = async(id) => {
      try{
        await deleteCategoria(token, id);
      setCategorias(categorias.filter((categoria) => categoria.id !== id));
      setIdEliminar(null);
      }catch(e){
        console.log(e.message)
      }
    }

    const handleEditar = (id) => {
        navigate(`/categorias/edit/${id}`)
    }

    const handleAdd = () => {
        navigate('/categorias/add');
      }
  return (
    <>
        <NavBar></NavBar>


    <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ textAlign: 'center' }} ><PriorityHigh></PriorityHigh></DialogTitle>
       <div className='container'>
        <DialogContentText sx={{ textAlign: 'center' }} id="alert-dialog-description">
            Estas a punto de eliminar la categoria {infoDialogo}. Esto le quitara la categoria asignada a 
            los productos que la tengan asignada.
          </DialogContentText>
          </div>
        <List >
            <ListItem   >
              <ListItemButton sx={{ justifyContent: 'center' }} 
              onClick={() => handleConfirm()} >
                Confirmar
              </ListItemButton>
           
            <ListItemButton sx={{ justifyContent: 'center' }}
                onClick={handleClose}
            >
                Cancelar
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>


        <div className='container mt-4'>
        <button onClick={handleAdd}>Agregar</button>
            {categorias && categorias.length > 0 ? (
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Gestion</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                {categorias.map(c => 
                    <tr>
                    <td>{c.id}</td>
                    <td>{c.titulo}</td>
                    <td>
                    <Button onClick={()=>handleEditar(c.id)} >Editar</Button>
                    <Button onClick={() =>handleDelete(c.id)}>Eliminar</Button>
                    </td>
                    </tr>
                )}
                </tbody>
                </table>
        ): (
            <p>No hay categorias disponibles</p>
            )}
            </div>
        
    </>
  )
}
