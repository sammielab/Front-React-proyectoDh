import React, { useEffect,useState, useContext } from 'react'
import { useParams } from "react-router-dom"; // Importa useParams
import { editUsers } from '../../../api/editUsers';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

export const EditUser = () => {

    const {auth, setAuth} = useAuth();
    const { id } = useParams();
    let token = auth.token
    let navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        id: "",
        name: "",
        apellido: "",
        email: "",
        password: "",
        role: ""
      });

      const [usuarioFormateado, setUsuarioFormateado] = useState({
        id: "",
        name: "",
        apellido: "",
        email: "",
        password: "",
        role: ""
      });

      const [error, setError] = useState(null);
      const [success, setSuccess] = useState(true)


useEffect(() => {

    const fetchUser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/usuarios/find/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Asegúrate de que `token` esté definido
                    'Content-Type': 'application/json',
                    withCredentials:true,
                },
            });
            console.log(response)
            if (!response.ok) {
              const text = await response.text();
              let data; 
      
              if(text){
                  data = JSON.parse(text)
              }else{
                  throw new Error(text)
              }

                throw new Error("Not ok");

            }

    
            const data = await response.json();
            console.log(data); 
            setUsuario(data)
    
        } catch (e) {
            console.error('Error fetching products:', e); // Maneja el error aquí
        }
    };
    fetchUser(); 
}, [id]); 


const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };


const handleSubmit = async(e,usuario) =>{
    console.log(usuario)
    e.preventDefault();

    if(usuario.name == '' || usuario.name.length<3){
        setSuccess(false)
    }
    if(usuario.apellido == '' || usuario.apellido.length<3){
        setSuccess(false)
    }
    if(usuario.email == '' || usuario.email.length<3 || !usuario.email.match(new RegExp("^[a-zA-Z0-9_.-]{1,}[@]{1}[a-zA-Z]{1,}[\.]{1}[a-zA-Z]{2,4}([\.]{1}[a-zA-Z]{2,4})?$","gi"))){
        setSuccess(false)
    }
    if(usuario.password == '' || usuario.password.length<6){
        setSuccess(false)
    }


    if(success == true){

        setUsuarioFormateado({
          ...usuario,
            id: usuario.id,
            name: usuario.name,
            apellido: usuario.apellido,
            email: usuario.email,
            password: usuario.password,
            role: usuario.role
        })


     

    }
}

  useEffect(() => {
        const fetchUser = async() => {
          try{
            const data =  await editUsers(token, usuarioFormateado)
            
            if(data != undefined){
              data.token = token
              setAuth(
                 data)
             ;
              navigate('/usuarios')
            }
          }catch(e){
              console.log(e)
          }
        }
       
      

      fetchUser()
  },[usuarioFormateado])

  return (
    <div>
      <h2>Editar Usuario</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={(e) => handleSubmit(e, usuario)}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={usuario.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={usuario.apellido}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={usuario.email}
            placeholder={usuario.email || "email"}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={usuario.password}
            onChange={handleChange}
            
          />
        </div>
        <div>
          <label>Rol:</label>
          <select name="role" value={usuario.role} onChange={handleChange}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button type="submit"  >Guardar cambios</button>
      </form>
    </div>
  )
}

