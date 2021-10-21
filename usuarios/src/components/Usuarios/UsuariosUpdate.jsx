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
	<h1>Editar Usuario</h1>

	<form onSubmit={putUser}>
		<input type="text"
		placeholder={usuario.nombre}
		name='Nombre'></input>
		<input type="email"
		placeholder={usuario.correo}
		name='Correo'></input>
		<input type="password"
			placeholder={usuario.contrasenia}
			name='contrasenia'></input>
		<button type="submit">Guardar</button>
		<input type="reset" value='limpiar' />
	</form>
		</>
	);
}
export default UsuariosUpdate;