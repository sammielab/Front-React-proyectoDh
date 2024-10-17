import React, { useState, useEffect } from 'react'
import {saveFetch} from '../../api/createProductService';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import {fetchCaracteristicas} from "../../api/fetchCaracteristicas.ts"
import {getCategorias} from "../../api/getCategorias.ts"


export const AddProducts = () => {
  let navigate = useNavigate();
  let token = localStorage.getItem('authToken')
  const [success, setSuccess] = useState(true)
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [userData, setUserData] = useState({
    titulo: '', 
    descripcion: '', 
    caracteristicas: [],
    precio: '', 
    categoria: {}, 
  })


  const handleCreate = async(e) => { 
    e.preventDefault();

    const validationErrors = validateFields();
   

    if (Object.keys(validationErrors).length === 0) {
      const formattedData = {
        ...userData,
        caracteristicas: [{ id: userData.caracteristicas }],
        categoria: { id: userData.categoria }
      }
      try {
        console.log(formattedData)
        await saveFetch(token, formattedData);
        navigate('/products');
      } catch (error) {
        console.error('Error al crear el producto:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };
  

  

  const validateFields = () => {
    let validationErrors = {};
    if (!userData.titulo || userData.titulo.length < 3) validationErrors.titulo = 'El título debe tener al menos 3 caracteres';
    if (!userData.descripcion || userData.descripcion.length < 3) validationErrors.descripcion = 'La descripción debe tener al menos 3 caracteres';
    if (!userData.caracteristicas) validationErrors.caracteristicas = 'Selecciona una característica';
    if (!userData.categoria) validationErrors.categoria = 'Selecciona una categoría';
    if (!userData.precio || userData.precio <= 0) validationErrors.precio = 'El precio debe ser mayor a 0';
    return validationErrors;
  };


  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name] : e.target.value
    })
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategorias(token);
        const featuresData = await fetchCaracteristicas(token);
        setCategories(categoriesData);
        setFeatures(featuresData);
      } catch (error) {
        console.error('Error al obtener categorías y características:', error);
      }
    };
    fetchData();
  }, [token]);


  return (
    
    <Box component="form" onSubmit={handleCreate} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500, margin: '0 auto', mt: 4 }}>
    <TextField
      label="Nombre"
      name="titulo"
      value={userData.titulo}
      onChange={handleChange}
      error={!!errors.titulo}
      helperText={errors.titulo}
      fullWidth
    />
    <TextField
      label="Descripción"
      name="descripcion"
      value={userData.descripcion}
      onChange={handleChange}
      error={!!errors.descripcion}
      helperText={errors.descripcion}
      fullWidth
    />
    <FormControl fullWidth>
      <InputLabel id="caracteristicas-label">Características</InputLabel>
      <Select
        labelId="caracteristicas-label"
        name="caracteristicas"
        value={userData.caracteristicas}
        onChange={handleChange}
        error={!!errors.caracteristicas}
      >
        {features.map((feature) => (
          <MenuItem key={feature.id} value={feature.id}>
            {feature.nombre}
          </MenuItem>
        ))}
      </Select>
      {errors.caracteristicas && <p style={{ color: 'red' }}>{errors.caracteristicas}</p>}
    </FormControl>
    <FormControl fullWidth>
      <InputLabel id="categoria-label">Categoría</InputLabel>
      <Select
        labelId="categoria-label"
        name="categoria"
        value={userData.categoria}
        onChange={handleChange}
        error={!!errors.categoria}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.titulo}
          </MenuItem>
        ))}
      </Select>
      {errors.categoria && <p style={{ color: 'red' }}>{errors.categoria}</p>}
    </FormControl>
 
    <TextField
      label="Precio"
      name="precio"
      type="number"
      value={userData.precio}
      onChange={handleChange}
      error={!!errors.precio}
      helperText={errors.precio}
      fullWidth
    />
    <Button onClick={handleCreate} type="submit" variant="contained" color="primary">
      Guardar
    </Button>
    <Button variant="outlined" color="secondary" onClick={() => navigate('/products')}>
      Cancelar
    </Button>
  </Box>
)
}

