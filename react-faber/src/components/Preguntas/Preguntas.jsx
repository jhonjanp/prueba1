import '../../App.css';
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
}from 'react-router-dom'
import axios from 'axios'
import{useState, useEffect} from 'react'

function Preguntas() {

  const[preguntas, setPreguntas ] = useState([]);
  const[pregunta, setPregunta]=useState({id:'', pregunta:'', id_tipo_pregunta:'', id_seccion: ''});

  const[secciones, setSecciones] = useState([]);
  const[preguntatipo, setPreguntatipo] = useState([]);

useEffect( () => {
	 axios.get('http://localhost:5000/secciones').then((response)=> {
    	setSecciones(response.data)
    })
   },[setSecciones]);

useEffect( () => {
	 axios.get('http://localhost:5000/tipo_preguntas').then((response)=> {
    	setPreguntatipo(response.data)
    })
   },[setPreguntatipo]);



useEffect(() => {
     axios.get('http://127.0.0.1:5000/preguntas').then((response)=> {
    //console.log(response.data);
    setPreguntas(response.data)
  })
   },[setPreguntas]);


   function fetchPreguntas(){
     axios.get('http://127.0.0.1:5000/preguntas').then((response)=> {
    //console.log(response.data);
    setPreguntas(response.data)
    })
  }

  const deletepregunta = async (id) =>{
      await axios.delete(`http://localhost:5000/preguntas/${id}`).then((response)=> {
      console.log(response.data)
    })
    fetchPreguntas()
  }

  const putpregunta = async (event)=>{
    event.preventDefault();
    const form = event.target;

     const data = {
      pregunta: `${form.pregunta.value===""? pregunta.pregunta: form.pregunta.value}`,
      id_tipo_pregunta: `${form.id_tipo_pregunta.value===""? pregunta.id_tipo_pregunta: form.id_tipo_pregunta.value}`,
      id_seccion: `${form.id_seccion.value===""? pregunta.id_seccion: form.id_seccion.value}`,
    };

      await axios.put(`http://localhost:5000/preguntas/${pregunta.id}`, data).then((response)=> {
        console.log(response.data);
      });

      fetchPreguntas();
    }

 function handlepregunta(pregunta){
    setPregunta({id:pregunta.id, pregunta:pregunta.pregunta, id_tipo_pregunta: pregunta.id_tipo_pregunta, id_seccion: pregunta.id_seccion})
 }

  const guardarpregunta = async (event) => {
    event.preventDefault();
    const form = event.target;

    const data = {
      pregunta: form.pregunta.value,
      id_tipo_pregunta: form.id_tipo_pregunta.value,
      id_seccion: form.id_seccion.value,
    };
    
    await axios.post('http://localhost:5000/preguntas', data)
    .then((response) => {
      console.log(response.data);
    });

    fetchPreguntas() 
  }
  return (
    <Router>
        <div className="container-preguntas-todo-grid">
          <Switch>
              <Route exact path="/preguntas">
                <div className="container-preguntas-grid">

                  <div className="c1-preguntas">
                    <Link to='/preguntas/crear' replace>  
                      <button className="preguntas-boton">
                        crear Preguntas 
                      </button>
                    </Link>
                  </div>
                    
                  <div className="c2-preguntas-tabla">
                    <table className="preguntas-tabla">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>pregunta</th>
                            <th>Id tipo_pregunta</th>
                            <th>Id seccion</th>
                            <th></th>
                            <th>Acciones</th>
                          </tr>
                        </thead>

                        <tbody>
                          {preguntas.map((pregunta, key) => 
                          <tr key={pregunta.id}>
                            <td>{pregunta.id}</td>
                            <td>{pregunta.pregunta}</td>
                            <td>{pregunta.id_tipo_pregunta}</td>
                            <td>{pregunta.id_seccion}</td>
                            <td>
                              <Link to={`preguntas/editar/`}>
                                <button onClick={() => handlepregunta(pregunta)}>Editar</button>
                              </Link>
                            </td>
                            <td><button onClick={()=>deletepregunta(pregunta.id)}>Eliminar</button></td>
                          </tr>
                          )}
                        </tbody>

                      </table>
                  </div>

                </div>
              </Route>

              <Route exact path="/preguntas/crear">
                
                <div className="container-preguntas-create">
                  <div className="c-preguntas-create-1">
                      <Link to="/preguntas" replace>volver</Link>
                      <form className="c-preguntas-create-form" onSubmit={guardarpregunta}>
                        
                        <p>Ingresar una Pregunta: </p>
                        <input className="preguntas-input1" type="text"
                        placeholder="pregunta"
                        name='pregunta'>
                        </input>
                        
                        <p>Seleccionar el Tipo de Pregunta: </p>
                        <select name="id_tipo_pregunta" id="">
                          {preguntatipo.map((pregunta,key)=>{
                            return (
                              <option key={pregunta.id} value={pregunta.id}>{pregunta.nombre}</option>
                            );
                          })
                          }
                        </select>
                        
                        <p>Seleccionar la Sección correspondiente: </p>
                        <select name="id_seccion" id="">
                            {secciones.map((seccion,key)=>{
                              return (
                              <option key={seccion.id} value={seccion.id}>{seccion.nombre}</option>);
                              })}
                        </select>
                        
                         <br /> <br />
                        <button className="preguntas-create-boton1" type="submit">Guardar</button>
                        <button className="preguntas-create-boton2" type="reset">Limpiar</button>
                    </form>
                  </div>
                  
                </div>
            </Route>

            <Route exact path="/preguntas/editar">
                <div className="container-preguntas-edit">
                  <div className="c-preguntas-edit-form-1">

                    <Link to="/preguntas" replace>volver</Link>
                    
                    <form className="c-preguntas-edit-form" onSubmit={putpregunta}>

                      <p>Ingresar Pregunta: </p>       
                      <input className="preguntas-edit-input1" type="text"
                        placeholder={pregunta.pregunta}
                        name='pregunta'>
                      </input>
                      
                      <p>Seleccionar una Sección: </p>
                      <select defaultValue={pregunta.id_seccion} name="id_seccion" id="">
                      {secciones.map((seccion,key)=>{
                      return (<option key={seccion.id} value={seccion.id} >{seccion.nombre}</option>);
                      })}
                      </select>
                      
                      <p>Seleccionar Tipo de Pregunta: </p>
                      <select defaultValue={pregunta.id_tipo_pregunta} name="id_tipo_pregunta" id="">
                      {preguntatipo.map((pregunta,key)=>{
                      return (<option key={pregunta.id} value={pregunta.id} >{pregunta.nombre}</option>);
                      })}
                      </select>
                      
                      <br /><br />
                      <button className="preguntas-edit-boton1" type="submit">Guardar</button>
                      <button className="preguntas-edit-boton2" type="reset">Limpiar</button>
                    </form>
                  </div>
                  
                </div>                  
            </Route>

          </Switch>
       </div>
    </Router>

  );
}
  export default Preguntas;
