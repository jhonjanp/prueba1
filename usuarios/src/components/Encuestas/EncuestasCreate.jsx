import React from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import{useState, useEffect} from 'react'

function EncuestasCreate(){

let history = useHistory();
  const[usuarios, setUsuarios] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

useEffect( () => {
	 axios.get('http://localhost:5000/usuarios').then((response)=> {
    	setUsuarios(response.data)
    })
   },[setUsuarios]);

const guardarencuesta = async (event) => {
    event.preventDefault();
    const form = event.target;

        const formData = new FormData();
        formData.append("nombre", form.nombre.value);
        formData.append("descripcion", form.descripcion.value);
        formData.append("id_usuario", form.id_usuario.value);
        formData.append("img_url", selectedFile);

    
    await axios.post('http://localhost:5000/encuestas', formData)
    .then((response) => {
      console.log(response.data);
    });
	history.push('/encuestas')
  }
  
const handleFileInput = (e) => {
	// handle validations
	setSelectedFile(e.target.files[0])
}
	return (
		<>
            <form onSubmit={guardarencuesta}>
              <input type="text"
                placeholder="Nombre"
                name='nombre'></input>
              <input type="text"
                placeholder="Descripcion"
                name='descripcion'></input>
				<select name="id_usuario" id="">
					{usuarios.map((usuario,key)=>{
						return (
							<option key={usuario.id} value={usuario.id}>{usuario.Correo}</option>
						);
					})
					}
				</select>
              <input type="file" onChange={handleFileInput}/>
              <button type="submit">Guardar</button>
              <input type="reset" value='limpiar' />
          </form>
		</>
	);
}
export default EncuestasCreate;