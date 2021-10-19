import './App.css';
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  NavLink,
}from 'react-router-dom'
import axios from 'axios'
import{useState, useEffect} from 'react'
import Encuestas from './components/Encuestas'
function App() {

    const history = useHistory();

  const[usuarios, setUsuarios ] = useState([]);
  const[usuario, setUsuario]=useState({id:'', nombre:'', correo:'', contrasenia:''});


  function fetchUsuarios(){
    axios.get('http://localhost:5000/usuarios').then((response)=> {
    //console.log(response.data);
    setUsuarios(response.data)
    })
  }

  const deleteUser = async (id) =>{
      await axios.delete(`http://localhost:5000/usuarios/${id}`).then((response)=> {
      console.log(response.data)
    })
    fetchUsuarios()
  }


  const putUser = async (event)=>{
    event.preventDefault();
    const form = event.target;
    console.log("form correo: ")
    console.log(form.Correo.value);
    const data = {
      Nombre: `${form.Nombre.value===""? usuario.nombre: form.Nombre.value}`,
      Correo: `${form.Correo.value===""? usuario.correo: form.Correo.value}`,
      Contraseña: `${form.contrasenia.value===""? usuario.contrasenia: form.contrasenia.value}`,
    };
    await axios.put(`http://localhost:5000/usuario/${usuario.id}`, data).then((response)=> {
      console.log(response.data);
    });
    fetchUsuarios();
  }

 function handleUser(user){
    setUsuario({id:user.id, nombre:user.Nombre, correo: user.Correo, contrasenia:user.Contraseña})
 }


  useEffect(() => {
    fetchUsuarios()
   }, []);


  const guardarUsuario = async (event) => {
    event.preventDefault();
    const form = event.target;

    const data = {
      Nombre: form.Nombre.value,
      Correo: form.Correo.value,
      Contraseña: form.Contraseña.value,
      
    };
    
    await axios.post('http://localhost:5000/registros', data)
    .then((response) => {
      console.log(response.data);
    });

    fetchUsuarios() 

  }

  return (
    <Router>
    <div>
      <nav>
        <ul>
        <li>
          <Link to='/'>inicio</Link>
          </li>
          <li>
            <Link to='/usuarios'>Usuarios</Link>
          </li>
          <li>
          <Link to='/encuestas'>Encuestas</Link>
          </li>
          <li>
          <Link to='/secciones'>secciones</Link>
          </li>
        <li>
          <Link to='/usuarios/crear'>usuarios crear</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        
          <Route exact path="/usuarios"> 
          usuarios
            <Link to='/usuarios/crear' replace>crear usuarios </Link>
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
                      <Link to={`usuarios/editar/`}>
                        <button onClick={() => handleUser(usuario)}>editar</button>
                      </Link>
                    </td>
                    <td><button onClick={()=>deleteUser(usuario.id)}>eliminar</button></td>
                  </tr>
                  )}
                  </tbody>
                </table>

            </Route>
          <Route exact path="/usuarios/crear">
            <div>
            <Link to="/usuarios" replace>volver</Link>
            <form onSubmit={guardarUsuario}>
              <input type="text"
                placeholder="Nombre"
                name='Nombre'></input>
              <input type="emailt"
                placeholder="Correo"
                name='Correo'></input>
              <input type="password"
                placeholder="Contraseña"
                name='Contraseña'></input>
              <button type="submit">Guardar</button>
              <input type="reset" value='limpiar' />
          </form>
        </div>
        </Route>
        <Route exact path="/usuarios/editar">
                    <div>
                      <h1>Editar Usuario</h1>
                        <Link to="/usuarios" replace>volver</Link>
                        <form onSubmit={putUser}>
                          <input type="text"
                            placeholder={usuario.nombre}
                            name='Nombre'></input>
                          <input type="email"
                            placeholder={usuario.correo}
                            name='Correo'></input>
                            <input type="password"
                              placeholder={usuario.contrasenia}
                              name='contrasenia'></input>
                          <button type="submit">Guardar</button>
                          <input type="reset" value='limpiar' />
                        </form>
                    </div>
        </Route>
            <Router exact path="/encuestas"> 
              <Encuestas/>
            </Router>

            <Router exact path="/secciones"> 
            <div>
              <Link to='/usuarios' >Usuarios</Link>
            <p>en la pagina secciones</p>
            </div>
            </Router>
            <Router exact path="/"> 
            <div>
              <h1>Menu principal</h1>
            </div>
          </Router>

      </Switch>
    </div>
    </Router>

  );
}
  export default App;
