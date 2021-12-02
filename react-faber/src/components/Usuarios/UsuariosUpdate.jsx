import {React, useState, useEffect} from 'react'
import { useHistory, useParams} from "react-router-dom";
import axios from 'axios'

function UsuariosUpdate(){

const[usuario, setUsuario]=useState({id:'', nombre:'', correo:'', contrasenia:''});

let history = useHistory();
const { id } = useParams();

 useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:5000/usuarios/${id}`);
    setUsuario({
		id: result.data[0][0],
		nombre: result.data[0][1],
		correo: result.data[0][2],
		contrasenia: result.data[0][3],
	});
  };
const putUser = async (event)=>{
    event.preventDefault();
    const form = event.target;
    const data = {
      Nombre: `${form.Nombre.value===""? usuario.nombre: form.Nombre.value}`,
      Correo: `${form.Correo.value===""? usuario.correo: form.Correo.value}`,
      Contraseña: `${form.contrasenia.value===""? usuario.contrasenia: form.contrasenia.value}`,
    };
    await axios.put(`http://localhost:5000/usuario/${usuario.id}`, data).then((response)=> {
      console.log(response.data);
    });
    //fetchUsuarios();
	history.push("/usuarios");
  }

	return (
		<>
			<div className="container-usuarios-edit">
				<div className="c-usuarios-edit-form-1">
					<form className="c-usuarios-edit-form" onSubmit={putUser}>

							<p>Nombre de Usuario:</p>
							<input className="usuarios-edit-input1" type="text"
							placeholder={usuario.nombre}
							name='Nombre'>
							</input>

							<p>Email:</p>
							<input className="usuarios-edit-input1" type="email"
							placeholder={usuario.correo}
							name='Correo'>
							</input>

							<p>Contrasenia:</p>
							<input className="usuarios-edit-input1" type="password"
								placeholder={usuario.contrasenia}
								name='contrasenia'>		
							</input>
							
							<button className="usuarios-edit-boton1" type="submit">Guardar</button>
							<button className="usuarios-edit-boton1" type="reset">Limpiar</button>
					</form>	
				</div>
			</div>
					
		</>
	);
}
export default UsuariosUpdate;