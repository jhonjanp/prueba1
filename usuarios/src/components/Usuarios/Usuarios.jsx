import '../../App.css';
import{
  Link,
}from 'react-router-dom'
import axios from 'axios'
import{useState, useEffect} from 'react'

function Usuarios() {

  const[usuarios, setUsuarios ] = useState([]);

  const deleteUser = async (id) =>{
      await axios.delete(`http://localhost:5000/usuarios/${id}`).then((response)=> {
      console.log(response.data)
    })
    axios.get('http://localhost:5000/usuarios').then((response)=> {
    setUsuarios(response.data)
    })
  }

  
  useEffect(() => {
    axios.get('http://localhost:5000/usuarios').then((response)=> {
    setUsuarios(response.data)
    })
   },[setUsuarios]);



  return (
	  <>
          usuarios
		  <Link to='/usuarios/crear'>
		  <button>Crear Usuario</button>
		  </Link>
                <table>
                  <thead>
                  <tr>
                    <th>iD</th>
                    <th>Nombres</th>
                    <th>Correo</th>
                  </tr>
                  </thead>
                  <tbody>
                  {usuarios.map((usuario, key) => 
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.Nombre}</td>
                    <td>{usuario.Correo}</td>
                
                    <td>
                      <Link to={`/usuarios/editar/${usuario.id}`}>
                        <button>editar</button>
                      </Link>
                    </td>
                    <td><button onClick={()=>deleteUser(usuario.id)}>eliminar</button></td>
                  </tr>
                  )}
                  </tbody>
                </table>
			</>
  );
}
  export default Usuarios;
