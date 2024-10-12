import React, { useState } from 'react'
import {saveFetch} from '../../api/createProductService';
import { useNavigate } from 'react-router-dom';


export const AddProducts = () => {
  let navigate = useNavigate();
  let token = localStorage.getItem('authToken')
  const [success, setSuccess] = useState(true)

  const [userData, setUserData] = useState({
    titulo: '', 
    descripcion: '', 
    caracteristicas: '',
    disponibilidad: '', 
    precio: '', 
    catalogo: '', 
    categoria: '', 
  })


  const handleCreate = async(e) => { 
    e.preventDefault();


    //validaciones 
    if(userData.titulo == '' || userData.titulo.length<3){
      setSuccess(false)
    }
    if(userData.caracteristicas == '' || userData.caracteristicas.length<3){
      setSuccess(false)
    }
    if(userData.descripcion == '' || userData.descripcion.length<3){
      setSuccess(false)
    }
    if(userData.disponibilidad == '' || userData.disponibilidad.length<3){
      setSuccess(false)
    }
    if(userData.precio == '' || userData.precio == 0){
      setSuccess(false)
    }

    if(success){
        try {
          setUserData({
            titulo: userData.titulo, 
            descripcion: userData.descripcion, 
            caracteristicas: userData.caracteristicas,
            disponibilidad: userData.disponibilidad, 
            precio: userData.precio,  
          })
          await saveFetch( token, userData);
          navigate('/products')
          
      } catch (error) {
          console.error('Error al crear el producto:', error);
      }
    }
  }


  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name] : e.target.value
    })
  }


  return (
    
    <form className="row g-3">
        <div className="col-md-6">
        <label for="titulo" className="form-label">Nombre</label>
        <input type="text" name='titulo' value={userData.titulo} onChange={handleChange} className="form-control" id="titulo"/>
        </div>
        <div className="col-md-6">
        <label for="decripcion" className="form-label">Descripcion</label>
        <input type="text" name="descripcion" value={userData.descripcion} onChange={handleChange} className="form-control" id="decripcion"/>
        </div>
        <div className="col-12">
        <label for="caract" className="form-label">Caracteristicas</label>
        <input type="text" name='caracteristicas' value={userData.caracteristicas} onChange={handleChange} className="form-control" id="caract" />
        </div>
        <div className="col-12">
        <label for="disponibilidad" className="form-label">Disponibilidad</label>
        <input type="date" name='disponibilidad' value={userData.disponibilidad}  onChange={handleChange} className="form-control" id="disponibilidad" placeholder="Apartment, studio, or floor"/>
        </div>
        <div className="col-md-6">
        <label for="precio" className="form-label" >Precio por noche</label>
        <input type="double" name='precio' value={userData.precio} onChange={handleChange} className="form-control" placeholder="$" id="precio"/>
        </div>
        <div className="col-md-4">
        <label for="catalogo" className="form-label">Catalogo</label>
        <select id="catalogo" className="form-select">
            <option >Seleccionar</option>
            <option name="catalogo" value={userData.catalogo} onChange={handleChange}>1</option>
        </select>
        </div>
        <div className="col-md-2">
        <label for="categoria" className="form-label">Categoria</label>
        <input type="text" name='categoria' value={userData.categoria} onChange={handleChange} className="form-control" id="categoria"/>
        </div>
        <div className="col-12">
        <button type="submit" onClick={handleCreate} className="btn btn-primary">Guardar</button>
        <button type="submit" className="btn btn-primary">Cancelar</button>
    </div>
  </form>
)
}

