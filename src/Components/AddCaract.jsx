import React, { useState, useEffect } from 'react';
import {findProductById} from '../api/findProduct';
import {fetchCaracteristicas} from '../api/fetchCaracteristicas';

export const AddCaract = ({token, id}) => {


  const [caracteristicas, setCaracteristicas] = useState([]);
  const [selectedCaracteristicas, setSelectedCaracteristicas] = useState([]);
  const [product, setProduct] = useState();
  const [productFormateado, setProductFormateado] = useState();
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState("");
  const [error, setError] = useState(null);

  // Fetch producto y sus características
 const fetchProducto = async() =>{
    try{
        const data = await findProductById(id, token)
        setProduct(data);
    }catch(e){
        console.log(e)
    }
 }

  useEffect(() => {
    fetchProducto();
  }, [token, id])
  

  const getCaracteristicas = async() => {
    try{
        const data = await fetchCaracteristicas(token); 
        setCaracteristicas(data)
    }catch(e){
        console.log(e)
    }
  }

  useEffect(() => {
    getCaracteristicas();
  }, [])
  



  // Maneja el cambio de input para agregar nueva característica
  const handleInputChange = (e) => {
    setNuevaCaracteristica(e.target.value);
  };

  // Valida y guarda la nueva característica
  // const handleAgregarCaracteristica = () => {
  //   if (nuevaCaracteristica.length < 3) {
  //     setError("La característica debe tener al menos 3 caracteres.");
  //     return;
  //   }

  //   // Limpiar errores y agregar la nueva característica
  //   setCaracteristicas([...caracteristicas, { nombre: nuevaCaracteristica }]);
  //   setNuevaCaracteristica("");
  //   setError(null);
  // };

  // Guardar cambios
  const handleGuardarCambios = async () => {

    try {

      const filteredCaracteristicas = caracteristicas.filter(caracteristica => selectedCaracteristicas.includes(caracteristica.id)); 

      setProductFormateado({
        id: product.id, 
        titulo: product.titulo, 
        descripcion: product.descripcion, 
        caracteristicas: filteredCaracteristicas, 
        disponibilidad: product.disponibilidad, 
        precio: product.precio, 
        categoria: product.categoria
      })

      const response = await fetch(`http://localhost:8080/productos/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productFormateado),
      });

      console.log(response)
      if (!response.ok) {
        throw new Error("Error guardando cambios");
      }

      // alert("Características guardadas exitosamente");
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
    <div>
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
    </div>
  );
};


