import React, { useState, useEffect } from 'react';
import {findProductById} from '../../api/findProduct';
import {saveCategoria} from '../../api/saveCategoria';

export const CategoriasAddItem = () => {

    const [categoria, setCategoria] = useState('');
    const [userData, setUserdata] = useState('');
    const token = localStorage.getItem('authToken')
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
        if (!categoria) {
            setError('El campo de nombre es obligatorio');
            return;
        }
        if(categoria.length<3){
            setError('El campo de nombre es obligatorio');
            return;
        }
        setError('');
        
        setUserdata({
            titulo:categoria
        })

        if(error==''){
            const data = await saveCategoria(token, userData);
        }

        // Limpiar el campo
        setCategoria('');
    };

return (
    <div className="container mt-5">
        <h2>Agregar Categoria</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="categoria" className="form-label">Titulo</label>
                <input
                    type="text"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
    </div>
);
};



