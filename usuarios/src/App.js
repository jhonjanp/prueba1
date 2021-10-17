//import {useEffect, useState } from 'react';
//import axios from 'axios';
import './App.css';

//function getUsuarios(){

  //return axios.get('http://localhost:5000/usuarios');
//}
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}from 'react-router-dom'
import axios from 'axios'
import{useState, useEffect} from 'react'

function App() {

  const[usuarios, setUsuarios ] = useState([]);
  useEffect(() => {
  //getUsuarios().then((response) => {
    axios.get('http://localhost:5000/usuarios').then((response)=> {
    //console.log(response.data);
    setUsuarios(response.data)
    })
  
  },[setUsuarios]);
 

  const guardarUsuario = (event) => {
    event.preventDefault();
    const form = event.target;

    const data = {
      Nombre: form.Nombre.value,
      Correo: form.Correo.value,
      Contraseña: form.Contraseña.value,
      
    };
    
    axios.post('http://localhost:5000/registros', data)
    .then((response) => {
      console.log(response.data);
    });

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
        
        </ul>
      </nav>

      <Switch>
        
          <Router exact path="/usuarios"> 
          usuarios
        
          <Link to='/usuarios/crear'>crear usuarios </Link>
          
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
      
          <td><button>editar</button></td><td><button>eliminar</button></td>
        </tr>
        )}
        </tbody>
      </table>

            </Router>

            <Router exact path="/encuestas"> 
            <p>en la pagina Encuestas</p>
            </Router>

            <Router exact path="/secciones"> 
            <p>en la pagina secciones</p>
            </Router>
            <Router exact path="/"> 
            <div>
            <n1>Menu principal</n1>
            </div>
          </Router>
          <Router exact path="/usuarios/crear">
            <Link to="/usuarios">volver</Link>

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
        </Router>

      </Switch>
    </div>
    </Router>

   // <div >
     // <ul>
    //{usuarios.map((nombre) => (
    //<li key = {nombre.id}>{nombre.Correo}</li>
    //))}
     // </ul>
    //</div>
    
  );
}
  export default App;
