import React from 'react'
import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

function SeccionCreate(){
let history=useHistory()

const[encuestas, setEncuestas] = useState([]);

useEffect( () => {
	 axios.get('http://localhost:5000/encuestas').then((response)=> {
    	setEncuestas(response.data)
    })

   },[setEncuestas]);

 const guardarseccion = async (event) => {
    event.preventDefault();
    const form = event.target;

    const data = {
      nombre: form.nombre.value,
      id_encuesta: form.id_encuesta.value,
    };
    
    await axios.post('http://localhost:5000/secciones', data)
    .then((response) => {
      console.log(response.data);
    });
	history.push('/secciones')
  }

	return (
		<>
      <div className="container-secciones-create">
        <div className="c-secciones-create-1">
          <form className="c-secciones-create-form" onSubmit={guardarseccion}>

              <p>Ingresar nombre de la Sección:</p>
              <input className="secciones-input1" type="text"
                    placeholder="Nombre"
                    name='nombre'>
              </input>
              <p>Nombre de la Encuesta:</p>
              <select name="id_encuesta" id="">
                {encuestas.map((encuesta,key)=>{
                  return (
                    <option key={encuesta.id} value={encuesta.id}>{encuesta.nombre}</option>
                  );
                })
                }
              </select>
                <br /><br /><br />
              <button className="secciones-create-boton1" type="submit">Guardar</button>
              <button className="secciones-create-boton2" type="reset">Limpiar</button>
          </form>
        </div>
      </div>
          

		</>
	);

}

export default SeccionCreate;