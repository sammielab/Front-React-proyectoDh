import React, { useState, useEffect } from 'react';
import {findProductById} from '../../api/findProduct';
import {saveCategoria} from '../../api/saveCategoria';
import { Box, Button, Grid, Card, CardContent, Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';

export const CategoriasAddItem = () => {

    const {auth} = useAuth();
    const [categoria, setCategoria] = useState('');
    const [userData, setUserdata] = useState('');
    const token = auth?.token
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!categoria.titulo) {
            setError('El campo de nombre es obligatorio');
            return;
        }
        if(categoria.titulo.length<3){
            setError('El campo de nombre es obligatorio');
            return;
        }
        if(categoria.imagen){
            setError('Debe cargar una imagen')
        }

        
        setError('');
        
        setUserdata({
            titulo:categoria.titulo, 
            imagen: categoria.imagen
        })

 
       
    };

    useEffect(() => {
    
            if(error=='' && userData){
                const formData = new FormData();
                formData.append('titulo', categoria.titulo);
                formData.append('imagen', categoria.imagen);

                const fetch = async (formData) => {
                    try{
                        const data = await saveCategoria(token, formData);
                        console.log(data)
                        if(data){
                            setCategoria({titulo: '', imagen: null});
                        }
                    }catch(e){
                        console.log(e.message)
                    }
                }
                fetch(formData);
            }
        
    }, [userData,error])

return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', borderRadius: '25px', marginTop:'6rem' }}>
    <Card   
        sx={{
        width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignContent:'center',
        textCenter: 'center', 
        alignItems: 'center',
        padding: '2rem'}}
    >
        <h2>Agregar Categoria</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="categoria" className="form-label">Titulo</label>
                <input
                    type="text"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    id="categoria"
                    value={categoria.titulo}
                    onChange={(e) => setCategoria({
                        ...categoria, 
                        titulo: e.target.value})
                    }
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="categoria" className="form-label">Imagen</label>
                <input
                    type="file"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    id="imagen"
                    onChange={(e) => setCategoria({
                        ...categoria, 
                        imagen: e.target.files[0]
                    })}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
            <Button sx={{backgroundColor: '#222D52', width:'100%', color:'#E8E4E0'}} type="submit" className="btn btn-primary">Enviar</Button>
        </form>
   </Card>
   </Box>
);
};



