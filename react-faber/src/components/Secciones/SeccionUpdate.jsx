import React from 'react'
import {useEffect, useState} from 'react'
import {useHistory, useParams, Link} from 'react-router-dom'
import axios from 'axios'

function SeccionUpdate(){

   let history = useHistory();
   const { id } = useParams();

  const[encuestas, setEncuestas] = useState([]);
  const[seccion, setSeccion]=useState({id:'', nombre:'', id_encuesta:''});

useEffect(() => {
	 axios.get('http://localhost:5000/encuestas').then((response)=> {

		 console.log(response.data)
    	setEncuestas(response.data)
    })
   },[setEncuestas]);

useEffect(() => {
  async function loadSeccion(){
    await axios.get(`http://localhost:5000/secciones/${id}`).then((response)=> {
    console.log(response.data)
        setSeccion({
          id: response.data[0][0],
          nombre: response.data[0][1],
          id_encuesta: response.data[0][2],
        });
      })
  }
  loadSeccion()
},[]);

  
const putseccion = async (event)=>{
    event.preventDefault();
    const form = event.target;

     const data = {
      nombre: `${form.nombre.value===""? seccion.nombre: form.nombre.value}`,
      id_encuesta: `${form.id_encuesta.value===""? seccion.id_encuesta: form.id_encuesta.value}`,
    };

      await axios.put(`http://localhost:5000/secciones/${seccion.id}`, data).then((response)=> {
        console.log(response.data);
      });

	  history.push('/secciones')
    }

	return (

		<>
      <div className="container-secciones-edit">
        <div className="secciones-boton-volver">
          <Link to="/secciones" replace>volver</Link>
        </div>

        <div className="c-secciones-edit-form-1">
          <form className="c-secciones-edit-form" onSubmit={putseccion}>

            <p>Nombre de la Sección:</p>
            <input className="secciones-edit-input1" type="text"
                    placeholder={seccion.nombre}
                    name='nombre'>
            </input>

            <br /><br />

            <p>Nombre de la Encuesta:</p>

            <select value={seccion.id_encuesta} name="id_encuesta" id="">
              {encuestas.map((encuesta,key)=>{
                    return (<option key={encuesta.id} value={encuesta.id} >{encuesta.nombre}</option>);
              })
              }
            </select>

            <br /><br /><br />

            <button className="secciones-edit-boton1" type="submit">Guardar</button>
            <button className="secciones-edit-boton2" type="reset">Limpiar</button>
          </form>
        </div>
      </div>
          
          
		</>
	);

}

export default SeccionUpdate;