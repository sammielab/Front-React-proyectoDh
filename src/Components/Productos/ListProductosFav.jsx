import React, { useEffect } from 'react'
import { Box, Button } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { getUserByEmail } from '../../api/getUserByEmail';
import useAuth from "../../hooks/useAuth";
import { useState } from 'react';
import { FavoriteBorder } from '@mui/icons-material';
import { editUsers } from '../../api/editUsers';

export const ListProductosFav = () => {

    const [user, setUser ]  = useState();
    const {auth,setAuth} = useAuth(); 
    const [userData, setUserData] = useState(); 
    const token = auth.token;

    
    const obtenerProductosFavoritos = async () => {
        try {
            const data = await getUserByEmail(auth.email, auth.token);
            setUser(data);
        } catch (e) {
            console.log(e);
        }
    };


    useEffect(() => {
        obtenerProductosFavoritos();
    }, []);

    const handleEliminarFav = async(e,id) => {
        e.preventDefault();
        let newFavorites = user.productosFavoritos.filter(product => product.id !== id )
        console.log(user)
        setUser({
            ...user, 
            productosFavoritos:newFavorites 
        })
        setUserData({
            ...user, 
            productosFavoritos:newFavorites 
        })
    }

useEffect(() => {
    console.log(userData)
    //Funcion encargada de eliminar el producto de la lista
    const deleteFav = async() => {
        try{
            const data = await editUsers(auth.token, userData); 
            return data
        }catch(e){
            console.log(e)
        }
    }
    deleteFav();
}, [userData])
    

  return (
    <>
      <Box>
                <h1>Productos Favoritos</h1>
                {user  ? (
                    <List>
                        {user.productosFavoritos ? (
                            user.productosFavoritos.map((producto) => (
                                <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <FavoriteBorder />
                                    </ListItemIcon>
                                  <ListItemText>{producto.titulo}</ListItemText>
                                  <Button onClick={(e) => handleEliminarFav(e,producto.id)} >Eliminar de favoritos </Button>
                                </ListItemButton>
                            </ListItem>
                            ))
                          
                        ): (
                            <p>asd</p>
                        )}
                        
                    </List>
                ) : (
                    <p>No tienes productos favoritos.</p> // Mensaje si no hay productos favoritos
                )}
            </Box>
    </>
  )
}
