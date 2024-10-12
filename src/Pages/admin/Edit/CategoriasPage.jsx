import React, { useState, useEffect } from 'react';
import NavBar from '../../../Components/Navegacion/NavBar'
import { useNavigate } from 'react-router-dom'
import {deleteCategoria} from '../../../api/deleteCategoria'
import { getCategorias } from '../../../api/getCategorias';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { PriorityHigh } from '@mui/icons-material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


export const CategoriasPage = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
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
                    <td><button onClick={()=>handleClickOpen(c.id, c.titulo)} >Eliminar</button>
                    <button onClick={()=>handleEditar(c.id)} >Editar</button>
                    
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
