import React, { useEffect, useState } from 'react'
import { Box, TextField, Button, Typography, Card } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import {getCategorias} from '../../api/getCategorias'
import CardContent from '@mui/material/CardContent';

export const CategoriasAMostrar = () => {
    const [categorias, setCategorias] = useState(); 
    const {auth} = useAuth(); 
    const token = auth.token; 

    useEffect(() => {
        
        const fetchCategorias = async() =>{
            try{
                const data = await getCategorias(token);
                console.log(data)
                if(data){
                    setCategorias(data); 
                }
            }catch(e){
                console.log(e.message)
            }
        }
        fetchCategorias()
    },[])
  return (
    <>
    <Box sx={{
        width: {xs: '100%', sm: '100%', md: '90%', l: '80%'},
        marginTop: 4,
        display: 'flex',
        justifyContent: 'center', 
        flexDirection: 'column'


    }}>
    <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'space-around', 
        gap: 1
    }}>
        {categorias  && categorias.map((categoria) => ( (
            <Card  
                key={categoria.id} 
                sx={{ 
                    width: { xs: '100%', sm: '48%', md: '30%' }, 
                    marginBottom: 2 ,
                    marginTop:2,
                    justifyContent: 'center',
                    display: 'flex'
                }}
            >
                    <CardContent sx={{
                          justifyContent: 'center',
                          alignContent: 'center',
                          alignItems: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%'
                    }}>
                        <Typography variant="h6">
                            {categoria.titulo}
                        </Typography>
                        <Box
                             sx={{ 
                                width: '40%', 
                                height: 'auto', 
                                maxWidth: 500,
                                justifyContent: 'space-between',
                                display: 'flex'
                                }}
                        >
                            <Box
                                component="img"
                                src={`data:image/jpeg;base64,${categoria.imagen}`}
                                alt={categoria.titulo}
                                loading="lazy"
                                sx={{ 
                                width: '100%', 
                                height: 'auto', 
                                maxWidth: 150,
                                justifyContent: 'space-between',
                                display: 'flex'
                                }}
                            />
                        </Box>
                    </CardContent>
                </Card>
                ))
        )}

    </Box>
    </Box>
    </>
  )
}
