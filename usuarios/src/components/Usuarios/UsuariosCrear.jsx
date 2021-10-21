import React from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'

function UsuariosCrear(){

let history = useHistory();

  const guardarUsuario = async (event) => {
    event.preventDefault();
    const form = event.target;

    const data = {
      Nombre: form.Nombre.value,
      Correo: form.Correo.value,
      Contraseña: form.Contraseña.value,
      
    };
    await axios.post('http://localhost:5000/registros', data)
    .then((response) => {
      console.log(response.data);
    });
	history.push('/usuarios')
  }
	return (
		<>
	<h1> Crear Usuario</h1>
	<form onSubmit={guardarUsuario}>
		<input type="text"
		placeholder="Nombre"
		name='Nombre'></input>
		<input type="email"
		placeholder="Email"
		name='Correo'></input>
		<input type="password"
			placeholder="Contrasenia"
			name='Contraseña'></input>
		<button type="submit">Guardar</button>
		<input type="reset" value='limpiar' />
	</form>
		</>
	);
}
export default UsuariosCrear;