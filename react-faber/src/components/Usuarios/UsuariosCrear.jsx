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
			<div className="container-usuarios-create">
				<div className="c-usuarios-create-1">
					<form className="c-usuarios-create-form" onSubmit={guardarUsuario}>

						<p>Ingresar su Nombre:</p>
						<input className="usuarios-input1" type="text"
							placeholder="Nombre"
							name='Nombre'>
						</input>
						<br /> <br />
						<p>Ingresar Email:</p>
						<input className="usuarios-input2" type="email"
							placeholder="Email"
							name='Correo'>	
						</input>
						<br /> <br />
						<p>Ingresar Contraseña:</p>
						<input className="usuarios-input3" type="password"
							placeholder="Contrasenia"
							name='Contraseña'>
						</input>

						<br /> <br /> <br />
						<button className="usuarios-create-boton1" type="submit">Guardar</button>
						<button className="usuarios-create-boton2" type="reset">Limpiar</button>

					</form>
				</div>
			</div>
			
		</>
	);
}
export default UsuariosCrear;