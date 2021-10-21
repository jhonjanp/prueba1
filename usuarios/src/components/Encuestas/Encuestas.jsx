import '../../App.css';
import{
  Link,
}from 'react-router-dom'
import axios from 'axios'
import{useState, useEffect} from 'react'

function Encuestas() {

  const[encuestas, setEncuestas ] = useState([]);


  const deleteEncuesta = async (id) =>{
      await axios.delete(`http://localhost:5000/encuesta/${id}`).then((response)=> {
      console.log(response.data)
    })
      axios.get('http://127.0.0.1:5000/encuestas').then((response)=> {
      setEncuestas(response.data)
      })
  }

  useEffect(()=>{
   axios.get('http://127.0.0.1:5000/encuestas').then((response)=> {
    //console.log(response.data);
    setEncuestas(response.data)
    })
   },[setEncuestas]);
 

  return (
    <>
		encuestas
		  <Link to='/encuestas/crear'>
		  <button>Crear Encuesta</button>
		  </Link>
                <table>
                  <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>URL IMG</th>
                    <th>Id usuario</th>
                  </tr>
                  </thead>
                  <tbody>
                  {encuestas.map((encuesta, key) => 
                  <tr key={encuesta.id}>
                    <td>{encuesta.id}</td>
                    <td>{encuesta.nombre}</td>
                    <td>{encuesta.descripcion}</td>
                    <td><a href={encuesta.img_url} target="_blank" rel="noreferrer"> url {encuesta.nombre}</a></td>
                    <td>{encuesta.id_usuario}</td>
                
                    <td>
                      <Link to={`encuestas/editar/${encuesta.id}`}>
                        <button>editar</button>
                      </Link>
                    </td>
                    <td><button onClick={()=>deleteEncuesta(encuesta.id)}>eliminar</button></td>
                  </tr>
                  )}
                  </tbody>
                </table>

              </>
  );
}
  export default Encuestas;
