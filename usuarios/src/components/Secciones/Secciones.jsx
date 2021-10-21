import '../../App.css';
import {
  Link,
} from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

function Secciones() {

  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/secciones').then((response) => {
      //console.log(response.data);
      setSecciones(response.data)
    })
  }, [setSecciones]);



  const deleteseccion = async (id) => {
    await axios.delete(`http://localhost:5000/secciones/${id}`).then((response) => {
      console.log(response.data)
      axios.get('http://127.0.0.1:5000/secciones').then((response) => {
        //console.log(response.data);
        setSecciones(response.data)
      })
    })

  }

  return (
    <>
      Secciones
      <Link to='/secciones/crear'>
        <button>Crear Seccion</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Id encuesta</th>
          </tr>
        </thead>
        <tbody>
          {secciones.map((seccion, key) =>
            <tr key={seccion.id}>
              <td>{seccion.id}</td>
              <td>{seccion.nombre}</td>
              <td>{seccion.id_encuesta}</td>
              <td>
                <Link to={`secciones/editar/${seccion.id}`}>
                  <button>editar</button>
                </Link>
              </td>
              <td><button onClick={() => deleteseccion(seccion.id)}>eliminar</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
export default Secciones;
