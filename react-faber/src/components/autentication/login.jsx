import React from 'react';
import '../.././App.css';
import axios from 'axios'
import { Form, Button } from 'react-bootstrap';

export default class Login extends React.Component {

	state = {
		nombre: '',
		contrasenia: '',
		errors: { 'usermsg': '' },
	}


	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = async event => {
		event.preventDefault();

		const user = {
			email: this.state.nombre,
			password: this.state.contrasenia
		};
		console.log(this.state.nombre)
		console.log(this.state.contrasenia)
		let msg=""

		await axios.post(`http://127.0.0.1:5000/login`, { user })
			.then(res => {
				msg=""
				console.log(res);
				console.log(res.data);
				localStorage.setItem("token_user", JSON.stringify(res.data));
				this.setState({
				errors: { 'usermsg': msg }
			});
			this.props.history.push("/encuestas");
			}).catch(function (error) {
				if (error.response) {
					console.log("here in cath erormsg")
					// Request made and server responded
					//this.state.errorServe=true
					msg=error.response.data
					console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
				} else if (error.request) {
					// The request was made but no response was received
					console.log(error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log('Error', error.message);
				}

			});
		if(msg!==""){
			this.setState({
				errors: { 'usermsg': msg }
			});
		}
	}

	render() {
		return (
			<div className="grid-login">
				<div className="container-grid-login">
					<div className="container-formulario-login position-absolute top-50 start-50 translate-middle">
						<Form method="POST" onSubmit={this.handleSubmit}>
							<div className="error-msg">{this.state.errors.usermsg}</div>
							<Form.Group className="mb-3" controlId="formBasicInput">
								<Form.Label>Email</Form.Label>
								<Form.Control type="text" name="nombre" placeholder="Email" onChange={this.handleChange} />
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Contraseña</Form.Label>
								<Form.Control type="password" name="contrasenia" placeholder="Password" onChange={this.handleChange} />
							</Form.Group>
							<button className="boton-login" type="submit">
								Iniciar Sesión
							</button>
							<img src="./carita-feliz.png" alt="" />
						</Form>
					</div>
				</div>
			</div>
		)
	}
}