import React, { useState, useEffect } from 'react';
import {findProductById} from '../api/findProduct';
import { getCategorias } from '../api/getCategorias';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getCategoriaById } from '../api/getCategoriaById';

export const CheckCategoria = ({id, token}) => {

    const [categorias, setCategorias] = useState()
    const [selectedCategoria, setSelectedCategoria] = useState([]) 
    const [product, setProduct] = useState();
    const [productDelete, setProductDelete] = useState();
    const [productFormateado, setProductFormateado] = useState();
    const [error, setError] = useState(null);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


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
      


      const handleGuardarCambios = async () => {
        try {
            
            //Encontrar la categoria con ese id 

          const data = await getCategoriaById(selectedCategoria,token);
          const categoriaFormateada = {
            "id": data.id
          }
          setProductFormateado({
            id: product.id, 
            titulo: product.titulo, 
            descripcion: product.descripcion, 
            caracteristicas: product.caracteristicas, 
            disponibilidad: product.disponibilidad, 
            precio: product.precio, 
            categoria: categoriaFormateada
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
    

      const handleCheckboxChange = (event) => {
            setSelectedCategoria(event.target.value)
        };

        const deleteCategoria = async() => {

            setProductDelete({
                id: product.id, 
                titulo: product.titulo, 
                descripcion: product.descripcion, 
                caracteristicas: product.caracteristicas, 
                disponibilidad: product.disponibilidad, 
                precio: product.precio, 
                categoria:null
              
              })

            try{
              const response = await fetch(`http://localhost:8080/productos/update`, {
                method: 'PUT',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(productDelete),
              });
        
              console.log(response)
              if (!response.ok) {
                throw new Error("Error guardando cambios");
              }
              // alert("Características guardadas exitosamente");
            } catch (e) {
              setError("Error eliminando la categoria");
            }
          };
        
        

  return (
    <>
        <h2>Editar Categoria del Producto</h2>
        {product && product.id && (
        <p>{product.titulo}</p>
      )}

        
            <div >
            <Select
                 labelId="demo-simple-select-label"
                 label="Seleccione la categoría"
                value={selectedCategoria} // valor actual del select
                onChange={handleCheckboxChange} // obtener el id de la categoría seleccionada
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
            </div>
      
         <Button variant="contained" type='submit' onClick={handleGuardarCambios} >Guardar</Button>
         <Button variant="contained"  onClick={deleteCategoria} >Eliminar</Button>
    </>
  )
}
