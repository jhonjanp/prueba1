import React from 'react';
import Home from '../components/Home/Home';
import Usuarios from '../components/Usuarios/Usuarios';
import UsuariosUpdate from '../components/Usuarios/UsuariosUpdate';
import UsuariosCrear from '../components/Usuarios/UsuariosCrear';
import EncuestasCreate from '../components/Encuestas/EncuestasCreate';
import Encuestas from '../components/Encuestas/Encuestas';
import EncuestasEdit from '../components/Encuestas/EncuestasEdit';
import Secciones from '../components/Secciones/Secciones';
import SeccionCreate from '../components/Secciones/SeccionCreate';
import SeccionUpdate from '../components/Secciones/SeccionUpdate';
import Preguntas from '../components/Preguntas/Preguntas';
import Login from '../components/autentication/login';
import { Switch, Route } from 'react-router-dom';

function Routing() {

	return (
		<>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/usuarios" exact component={Usuarios} />
				<Route path="/usuarios/editar/:id" exact component={UsuariosUpdate} />
				<Route path="/usuarios/crear" exact component={UsuariosCrear} />
				<Route path="/encuestas/" exact component={Encuestas} />
				<Route path="/encuestas/crear" exact component={EncuestasCreate} />
				<Route path="/encuestas/editar/:id" exact component={EncuestasEdit} />
				<Route path="/secciones/" exact component={Secciones} />
				<Route path="/secciones/crear" exact component={SeccionCreate} />
				<Route path="/secciones/editar/:id" exact component={SeccionUpdate} />
				<Route path="/preguntas/" exact component={Preguntas} />
				<Route path="/login" exact component={Login} />

			</Switch>
		</>
	)
}

export default Routing;