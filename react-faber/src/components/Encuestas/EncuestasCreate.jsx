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
      <div className="container-encuestas-create">
        <div className="c-encuestas-create-1">
          <form className="c-encuestas-create-form" onSubmit={guardarencuesta}>

                <p>Ingresar nombre de la encuesta:</p>
                <input className="encuestas-input1" type="text" placeholder="Nombre" name='nombre'></input>
                <p>Ingresar descripción de la encuesta:</p>
                <input className="encuestas-input2" type="text" placeholder="Descripcion" name='descripcion'></input>
                
                <p>Seleccione el ID de su usuario:</p>
                <select name="id_usuario" id="">
                  {usuarios.map((usuario,key)=>{
                    return (
                      <option key={usuario.id} value={usuario.id}>{usuario.Correo}</option>
                    );
                  })
                  }
                </select>
                
                <p>Seleccione una imagen:</p>
                <input className="encuestas-input3" type="file" onChange={handleFileInput}/>

                <br /> <br /> <br />
                <button className="encuestas-create-boton1" type="submit">Guardar</button>
                <button className="encuestas-create-boton2" type="reset">Limpiar</button>
          </form>
        </div> 
      </div>
            
		</>
	);
}
export default EncuestasCreate;