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
            <form onSubmit={guardarseccion}>
              <input type="text"
                placeholder="Nombre"
                name='nombre'></input>
				<select name="id_encuesta" id="">
					{encuestas.map((encuesta,key)=>{
						return (
							<option key={encuesta.id} value={encuesta.id}>{encuesta.nombre}</option>
						);
					})
					}
				</select>
              <button type="submit">Guardar</button>
              <input type="reset" value='limpiar' />
          </form>

		</>
	);

}

export default SeccionCreate;