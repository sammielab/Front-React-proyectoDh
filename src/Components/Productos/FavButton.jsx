import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; 
import useAuth from "../../hooks/useAuth";
import { getUserByEmail } from '../../api/getUserByEmail';
import { editUsers } from '../../api/editUsers';

const FavButton = ({id}) => {
  const [filled, setFilled] = useState(false); 
  const {auth,setAuth} = useAuth(); 
  const [userData, setUserData ] = useState();

  useEffect(() => {
    const fetch = async () => {
        const data = await getUserByEmail(auth.email, auth.token); 
        console.log(data)
        if (data && data.productosFavoritos.some(fav => fav.id === id)) {
            setFilled(true); // Set filled to true if the product is already a favorite
        }
    }
    fetch();

  }, [auth.email, auth.token, id])


  const handleClick = async() => {

    try{
       const usuario =  await getUser();
        console.log("obtengo el usuario luego del click")
        console.log(usuario)
       if(usuario){
        
        const x = usuario.productosFavoritos.find(producto => producto.id === id)
        
        if(x == undefined){
            console.log("llega al undefined")
            console.log("El rol del usuario es ")
            console.log(usuario.role)
            setUserData({
                "id": usuario.id, 
                "name":usuario.name,
                "apellido": usuario.apellido,
                "email": usuario.email, 
                "password": usuario.password, 
                "puntuaciones": usuario.puntuaciones, 
                "role": usuario.role, 
                "productosFavoritos": [...usuario.productosFavoritos, {"id": id}]
            }); 
        }else{
     
             const newFavs = usuario.productosFavoritos.filter(fav => fav.id !== id)
             const updatedFavs = newFavs.length === 0 ? [] : newFavs;
            
            setUserData({
                "id": usuario.id, 
                "name":usuario.name,
                "apellido": usuario.apellido,
                "email": usuario.email, 
                "password": usuario.password, 
                "puntuaciones": usuario.puntuaciones, 
                "role": usuario.role, 
                "productosFavoritos": updatedFavs
            }); 
        }


            setFilled((prev) => !prev); 
       }
            
    }catch(e){
        console.log(e)
    }
    
    }

 

    useEffect(() => {
        const updateFav = async () => {
            try{
                
                const update = await editUsers(auth.token, userData)
                
            }catch(e){
                console.log(e)
            }
        }
        updateFav();
    },[userData])



  const getUser = async() => {
    try{
        const data = await getUserByEmail(auth.email, auth.token); 
        return data
    }catch(e){
        console.log(e)
    }
  }


  return (
    <IconButton onClick={handleClick}>
      {filled ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />} 
    </IconButton>
  );
};

export default FavButton;