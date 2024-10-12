import React, { useState, useEffect } from 'react';
import {findProductById} from '../../api/findProduct';
import {saveCaracteristicas} from '../../api/createCaracteristica';

export const AddCaracteristica = () => {

    const [nombre, setNombre] = useState('');
    const [userData, setUserdata] = useState('');
    const token = localStorage.getItem('authToken')
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

        if(error==''){
            const data = await saveCaracteristicas(token, userData);
        }


        // Limpiar el campo
        setNombre('');
    };

return (
    <div className="container mt-5">
        <h2>Agregar Nombre</h2>
        <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
    </div>
);
};


