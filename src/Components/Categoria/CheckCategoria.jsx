import React, { useState, useEffect } from 'react';
import {findProductById} from '../../api/findProduct';
import { getCategorias } from '../../api/getCategorias';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getCategoriaById } from '../../api/getCategoriaById';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import {editProducts} from '../../api/editProducts';


export const CheckCategoria = ({id, token}) => {
  console.log(id)
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(''); 
  const [product, setProduct] = useState({});
  const [productDelete, setProductDelete] = useState({});
  const [productFormateado, setProductFormateado] = useState({});
  const [error, setError] = useState(null);

  const fetchProducto = async () => {
    try {
      const data = await findProductById(id, token);
      setProduct(data);
      console.log(data);
      if(data){
        setSelectedCategoria(data?.categoria || '');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchProducto();
  }, [token, id]);

  const fetchCategorias = async () => {
    try {
      const data = await getCategorias(token);
      setCategorias(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleGuardarCambios = async () => {
    try {
      const data = await getCategoriaById(selectedCategoria, token);
      const categoriaFormateada = {
        id: data.id,
      };
      setProductFormateado({
        ...product, 
        id: product.id,
        categoria: categoriaFormateada || product.categoria,
      });
    }catch(e){
      console.log(e.message);
    }
     
  };


  useEffect(() => {

    const updateProducto = async () => {
      try {
        const data = await editProducts(token,productFormateado );
        console.log(data); 
        return data;
      }catch(e)
      {console.log(e.message)}
    }

    if(productFormateado.id){
      updateProducto(); 
    }
  }, [productFormateado])

  const handleCheckboxChange = (event) => {
    setSelectedCategoria(event.target.value);
  };

  const deleteCategoria = async () => {
    setProductDelete({
      id: product.id,
      titulo: product.titulo,
      descripcion: product.descripcion,
      caracteristicas: product.caracteristicas,
      disponibilidad: product.disponibilidad,
      precio: product.precio,
      categoria: null,
    });

    try {
      const response = await fetch(`http://localhost:8080/productos/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productDelete),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error('Error eliminando la categoria');
      }
    } catch (e) {
      setError('Error eliminando la categoria');
    }
  };

  return (
    <>
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', borderRadius: '25px', marginTop:'6rem' }}>
      <Card  sx={{
      width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
      maxWidth: '600px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', 
      alignContent:'center',
      textCenter: 'center', 
      alignItems: 'center',
      padding: '2rem'
    }}>
        <h2 sx={{color:'#222D52',marginTop:'2rem'}}>Editar Categoria del Producto</h2>
        {product && product.id && (
        <p>{product.titulo}</p>
      )}
            <Box sx={{width:'100%', justifyContent: 'center', display: 'flex'}}>
            <Select
            sx={{width: '70%'}}
                 labelId="demo-simple-select-label"
                 label="Seleccione la categoría"
                value={selectedCategoria} 
                onChange={handleCheckboxChange} 
            >
            {categorias && categorias.map((categoria) => (
                <MenuItem
                key={categoria.id}
                value={categoria.id}
                >
                {categoria.titulo}
                </MenuItem>
            ))}
    </Select>
            </Box>
      
         <Button sx={{backgroundColor: '#222D52', marginTop: '2rem', marginBottom: '2rem', width: '50%'}} variant="contained" type='submit' onClick={handleGuardarCambios} >Guardar</Button>
         </Card>
      </Box>
    </>
  )
}
