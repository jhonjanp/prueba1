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
    var token=JSON.parse(localStorage.getItem('token_user'))

    console.log("Este es el TOKEN")
    console.log(token)


    axios.get('http://127.0.0.1:5000/usuarios', {
      headers: {
        'Authorization': `Bearer ${token.token}`

      }

  }).then((response)=> {
    setUsuarios(response.data)
    })
   },[setUsuarios]);



  return (
	  <>
      <div className="container-usuarios-grid">

        <div className="c1-usuarios">
          <Link to='/usuarios/crear'>
            <button className="usuarios-boton">Crear Usuario</button>
          </Link>
        </div>
          
        <div className="c2-usuarios-tabla">
          <table className="usuarios-tabla">
              
              <thead>
                <tr>
                  <th>iD</th>
                  <th>Nombres</th>
                  <th>Correo</th>
                  <th></th>
                  <th>ACCIONES</th>                
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
                      <button>Editar</button>
                    </Link>
                  </td>
                  <td>
                    
                    <button onClick={()=>deleteUser(usuario.id)}>Eliminar</button></td>
               
               </tr>)}
              </tbody>
          </table>
        </div>
                    
      </div>

          
		</>
  );
}
  export default Usuarios;
