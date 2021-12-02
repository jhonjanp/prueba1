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
      <div className="container-secciones-grid">

        <div className="c1-secciones">
          <Link to='/secciones/crear'>
              <button className="secciones-boton">Crear Sección</button>
          </Link>
        </div>

        <div className="c2-secciones-tabla">
          <table className="secciones-tabla">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Id encuesta</th>
                  <th></th>
                  <th>Acciones</th>
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
                        <button>Editar</button>
                      </Link>
                    </td>
                    <td><button onClick={() => deleteseccion(seccion.id)}>Eliminar</button></td>
                  </tr>
                )}
              </tbody>
          </table>
        </div>

      </div>


            
            
    </>
  );
}
export default Secciones;
