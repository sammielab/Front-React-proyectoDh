import React, { useState, useEffect } from 'react';
import { findProductById } from '../../api/findProduct';
import { fetchCaracteristicas } from '../../api/fetchCaracteristicas';
import { Box, Card } from '@mui/material';

export const AddCaract = ({ token, id }) => {
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [selectedCaracteristicas, setSelectedCaracteristicas] = useState([]);
  const [product, setProduct] = useState();
  const [productFormateado, setProductFormateado] = useState();
  const [error, setError] = useState(null);

  // Fetch producto y sus características
  const fetchProducto = async () => {
    try {
      const data = await findProductById(id, token);
      setProduct(data);
      // Preseleccionar las características del producto
      const preselectedCaracteristicas = data.caracteristicas.map((caract) => caract.id);
      setSelectedCaracteristicas(preselectedCaracteristicas);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchProducto();
  }, [token, id]);

  const getCaracteristicas = async () => {
    try {
      const data = await fetchCaracteristicas(token);
      setCaracteristicas(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCaracteristicas();
  }, []);

  const handleGuardarCambios = async () => {
    const filteredCaracteristicas = caracteristicas.filter(caracteristica =>
      selectedCaracteristicas.includes(caracteristica.id)
    );

    const nuevoProductoFormateado = {
      id: product.id,
      titulo: product.titulo,
      descripcion: product.descripcion,
      caracteristicas: filteredCaracteristicas,
      disponibilidad: product.disponibilidad,
      precio: product.precio,
      categoria: product.categoria,
    };

    setProductFormateado(nuevoProductoFormateado);
    
    try {
      const response = await fetch(`http://localhost:8080/productos/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProductoFormateado),
      });

      if (!response.ok) {
        throw new Error("Error guardando cambios");
      }
      
      // Si la respuesta es exitosa, limpia el error
      setError(null);
      console.log('Cambios guardados exitosamente');
      
    } catch (e) {
      setError("Error guardando las características");
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedCaracteristicas.includes(id)) {
      setSelectedCaracteristicas(selectedCaracteristicas.filter(item => item !== id));
    } else {
      setSelectedCaracteristicas([...selectedCaracteristicas, id]);
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', borderRadius: '25px', marginTop: '6rem' }}>
      <Card sx={{
        width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}>
        <h2>Editar Características del Producto</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {product && product.id && (
          <p>{product.titulo}</p>
        )}

        <div>
          {caracteristicas.map(caracteristica => (
            <div className="form-check" key={caracteristica.id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`caracteristica-${caracteristica.id}`}
                value={caracteristica.id}
                checked={selectedCaracteristicas.includes(caracteristica.id)}
                onChange={() => handleCheckboxChange(caracteristica.id)}
              />
              <label className="form-check-label" htmlFor={`caracteristica-${caracteristica.id}`}>
                {caracteristica.nombre}
              </label>
            </div>
          ))}
        </div>

        <button onClick={handleGuardarCambios}>Guardar Cambios</button>
      </Card>
    </Box>
  );
};
