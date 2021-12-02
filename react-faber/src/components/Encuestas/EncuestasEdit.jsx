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
      <div className="container-encuestas-edit">
        <div className="c-encuestas-edit-form-1">
          <form className="c-encuestas-edit-form" onSubmit={putEncuesta}>

            <p>Nombre de la encuesta:</p>
                  <input className="encuestas-edit-input1" type="text"
                    placeholder={encuesta.nombre}
                    name='nombre'>
                  </input>
            
            <p>Descripción de la encuesta:</p>

                  <input className="encuestas-edit-input2" type="text"
                    placeholder={encuesta.descripcion}
                    name='descripcion'>
                  </input>
                  {encuesta.id_usuario}
                  <br/>
            <p>Seleccione su ID de usuario:</p>

            <select value={encuesta.id_usuario} name="id_usuario" id="">
              {usuarios.map((usuario)=>{
                    return (<option key={usuario.id} value={usuario.id} >{usuario.Correo}</option>);
              })
              }
            </select>
              
                  <input className="encuestas-edit-input3" type="file" onChange={handleFileInput}/>
                  <br /><br /><br />
                  <button className="encuestas-edit-boton1" type="submit">Guardar</button>
                  <button className="encuestas-edit-boton2" type="reset">Limpiar </button>
          </form>
        </div>       
      </div>                  
	
		</>
	);
}
export default EncuestasEdit;