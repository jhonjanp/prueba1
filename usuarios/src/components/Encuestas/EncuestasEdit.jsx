import {React, useState, useEffect} from 'react'
import { useHistory, useParams} from "react-router-dom";
import axios from 'axios'

function EncuestasEdit(){

const[encuesta, setEncuesta]=useState({id:'', nombre:'', descripcion:'', img_url:'', id_usuario:''});
const[usuarios, setUsuarios] = useState([]);
const [selectedFile, setSelectedFile] = useState(null);

let history = useHistory();
const {id} = useParams();

 useEffect(() => {
   async function loadUsuario(){
      await axios.get(`http://localhost:5000/encuestas/${id}`).then((result)=>{
          setEncuesta({
            id: result.data[0][3],
            nombre: result.data[0][0],
            descripcion: result.data[0][1],
            img_url: result.data[0][2],
            id_usuario: result.data[0][4]
        });
      });
    }
    loadUsuario()
  }, []);

useEffect( () => {
	 axios.get('http://localhost:5000/usuarios').then((response)=> {
    	setUsuarios(response.data)
    })
   },[]);

const putEncuesta = async (event)=>{
    event.preventDefault();
    const form = event.target;

    console.log(encuesta)
    console.log(id)

    const formData = new FormData();
    formData.append("nombre", `${form.nombre.value===""? encuesta.nombre: form.nombre.value}`);
    formData.append("descripcion", `${form.descripcion.value===""? encuesta.descripcion: form.descripcion.value}`);
    formData.append("id_usuario", `${form.id_usuario.value===""? encuesta.id_usuario: form.id_usuario.value}`);
    formData.append("img_url", selectedFile);
      await axios.put(`http://localhost:5000/encuesta/${id}`, formData).then((response)=> {
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
    <div>
            <form onSubmit={putEncuesta}>
              <input type="text"
                placeholder={encuesta.nombre}
                name='nombre'></input>
              <input type="text"
                placeholder={encuesta.descripcion}
                name='descripcion'></input>
                {encuesta.id_usuario}
                <br/>
				<select value={encuesta.id_usuario} name="id_usuario" id="">
					{usuarios.map((usuario)=>{
								return (<option key={usuario.id} value={usuario.id} >{usuario.Correo}</option>);
					})
					}
				</select>
              <input type="file" onChange={handleFileInput}/>
              <button type="submit">Guardar</button>
              <input type="reset" value='limpiar' />
          </form>
        </div>                  
	
		</>
	);
}
export default EncuestasEdit;