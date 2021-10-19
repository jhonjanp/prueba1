import '../App.css';
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
}from 'react-router-dom'
import axios from 'axios'
import{useState, useEffect} from 'react'

function Encuestas() {

  const[encuestas, setEncuestas ] = useState([]);
  const[encuesta, setEncuesta]=useState({id:'', nombre:'', descripcion:'', img_url:'', id_usuario:''});
  const [selectedFile, setSelectedFile] = useState(null);


  const[usuarios, setUsuarios] = useState([]);

useEffect(async () => {
	await axios.get('http://localhost:5000/usuarios').then((response)=> {
    	setUsuarios(response.data)
    })
   }, []);
 
  async function fetchEncuestas(){
    await axios.get('http://127.0.0.1:5000/encuestas').then((response)=> {
    //console.log(response.data);
    setEncuestas(response.data)
    })
  }

  const deleteEncuesta = async (id) =>{
      await axios.delete(`http://localhost:5000/encuesta/${id}`).then((response)=> {
      console.log(response.data)
    })
    fetchEncuestas()
  }


  const putEncuesta = async (event)=>{
    event.preventDefault();
    const form = event.target;
	const formData = new FormData();
	console.log("this is the id_usuario:")
	console.log(form.id_usuario.value)
	console.log(form.descripcion.value)
	console.log(form.nombre.value)
	formData.append("nombre", `${form.nombre.value===""? encuesta.nombre: form.nombre.value}`);
	formData.append("descripcion", `${form.descripcion.value===""? encuesta.descripcion: form.descripcion.value}`);
	formData.append("id_usuario", `${form.id_usuario.value===""? encuesta.id_usuario: form.id_usuario.value}`);
	formData.append("img_url", selectedFile);
	console.log(formData)
    await axios.put(`http://localhost:5000/encuesta/${encuesta.id}`, formData).then((response)=> {
      console.log(response.data);
    });
    fetchEncuestas();
  }

 function handleEncuesta(encuesta){
    setEncuesta({id:encuesta.id, nombre:encuesta.nombre, descripcion: encuesta.descripcion, img_url:encuesta.img_url,
		id_usuario:encuesta.id_usuario
	})
 }

const handleFileInput = (e) => {
	// handle validations
	setSelectedFile(e.target.files[0])
}

  useEffect(() => {
    fetchEncuestas()
	console.log(usuarios)
   }, []);


  const guardarencuesta = async (event) => {
    event.preventDefault();
    const form = event.target;

	const formData = new FormData();
	formData.append("nombre", form.nombre.value);
	formData.append("descripcion", form.descripcion.value);
	formData.append("id_usuario", form.id_usuario.value);
	formData.append("img_url", selectedFile);

    
    await axios.post('http://localhost:5000/encuestas', formData)
    .then((response) => {
      console.log(response.data);
    });

    fetchEncuestas() 
  }

  return (
    <Router>
    <div>
		<Switch>
		encuestas
		<Route exact path="/encuestas"> 
            <Link to='/encuestas/crear' replace>crear encuestas </Link>
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
                    <td><a href={encuesta.img_url} target="_blank"> url {encuesta.nombre}</a></td>
                    <td>{encuesta.id_usuario}</td>
                
                    <td>
                      <Link to={`encuestas/editar/`}>
                        <button onClick={() => handleEncuesta(encuesta)}>editar</button>
                      </Link>
                    </td>
                    <td><button onClick={()=>deleteEncuesta(encuesta.id)}>eliminar</button></td>
                  </tr>
                  )}
                  </tbody>
                </table>
				</Route>
          <Route exact path="/encuestas/crear">
            <div>
            <Link to="/encuestas" replace>volver</Link>
            <form onSubmit={guardarencuesta}>
              <input type="text"
                placeholder="Nombre"
                name='nombre'></input>
              <input type="text"
                placeholder="Descripcion"
                name='descripcion'></input>
				<select name="id_usuario" id="">
					{usuarios.map((usuario,key)=>{
						return (
							<option key={usuario.id} value={usuario.id}>{usuario.Correo}</option>
						);
					})
					}
				</select>
              <input type="file" onChange={handleFileInput}/>
              <button type="submit">Guardar</button>
              <input type="reset" value='limpiar' />
          </form>
        </div>
        </Route>
        <Route exact path="/encuestas/editar">
              <div>
            <Link to="/encuestas" replace>volver</Link>
            <form onSubmit={putEncuesta}>
              <input type="text"
                placeholder={encuesta.nombre}
                name='nombre'></input>
              <input type="text"
                placeholder={encuesta.descripcion}
                name='descripcion'></input>
				<select name="id_usuario" id="">
					{usuarios.map((usuario,key)=>{
						if(usuario.id===encuesta.id_usuario){
							console.log("se detecto?")
							return (
								<option key={usuario.id} selected value={usuario.id}>{usuario.Correo}</option>
							);
						}else{
							return (
								<option key={usuario.id} value={usuario.id}>{usuario.Correo}</option>
							);
						}
					})
					}
				</select>
              <input type="file" onChange={handleFileInput}/>
              <button type="submit">Guardar</button>
              <input type="reset" value='limpiar' />
          </form>
        </div>                  
        </Route>

      </Switch>
    </div>
    </Router>

  );
}
  export default Encuestas;
