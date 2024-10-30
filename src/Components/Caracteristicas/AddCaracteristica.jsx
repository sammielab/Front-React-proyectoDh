import React, { useState, useEffect } from 'react';
import {findProductById} from '../../api/findProduct';
import {saveCaracteristicas} from '../../api/createCaracteristica';
import useAuth from '../../hooks/useAuth';
import { Box, Button, Grid, Card, CardContent, Typography } from '@mui/material';

export const AddCaracteristica = () => {

    const [nombre, setNombre] = useState('');
    const [userData, setUserdata] = useState('');
    const {auth} = useAuth();
    const token = auth?.token
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
        if (!nombre) {
            setError('El campo de nombre es obligatorio');
            return;
        }
        if(nombre.length<3){
            setError('El campo de nombre es obligatorio');
            return;
        }
        setError('');
        
        setUserdata({
            nombre:nombre
        })

      
    };


    useEffect(() => {
        if(error == ''){
            const fetch = async()=>{
                try{
                     const data = await saveCaracteristicas(token, userData);
                    if(data){
                        setNombre('');
                    }
                }catch(e){
                    console.log(e.message)
                }
            }

            fetch();
        }
    }, [userData, error])
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
        <h2>Agregar Nombre</h2>
        <form onSubmit={handleSubmit} >
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                    type="text"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
            <Button sx={{backgroundColor: '#222D52', width:'100%', color:'#E8E4E0'}} type="submit" className="btn btn-primary">Guardar</Button>
        </form>
      </Card>
    </Box>
);
};


