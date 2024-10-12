import React from 'react'
import NavBar from '../../../Components/Navegacion/NavBar'
import { useParams } from "react-router-dom"; // Importa useParams
import { useState, useEffect } from 'react'
import {getCategoriaById} from '../../../api/getCategoriaById'
import {updateCategoria} from '../../../api/editCategoria'


const EditCategoriasPage = () => {
  const { id } = useParams();
  const [categoriaById, setCategoriaById] = useState();
  const [titulo, setTitulo] = useState('');
  const [error, setError] = useState('');
  let token = localStorage.getItem('authToken');

  const getCategoria = async () =>{
    try{
      const data = await getCategoriaById(token, id);
      setCategoriaById(data); 
    }catch(e){
      console.log(e)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto

    if (!titulo) {
        setError('El campo de título es obligatorio');
        return;
    }

    setError(''); // Limpiar cualquier error previo

    const userData = {
      "id":id,
      "titulo":titulo
    }

    try {
        await updateCategoria(token, userData); // Llamar a la API para actualizar el producto
        alert('Título actualizado con éxito');
    } catch (e) {
        console.error('Error al actualizar el producto', e);
        setError('Hubo un error al actualizar el producto');
    }
};


  return (
    <>
       <div className="container mt-5">
            <h2>Editar Categoria</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="titulo" className="form-label">Título</label>
                    <input
                        type="text"
                        className={`form-control ${error ? 'is-invalid' : ''}`}
                        id="titulo"
                        value={titulo} // Valor del estado `titulo`
                        onChange={(e) => setTitulo(e.target.value)} // Actualizar el estado `titulo`
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </div>
    </>
  )
}

export default EditCategoriasPage
