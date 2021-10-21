import React from "react";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
			Encuestas
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/usuarios">
				Usuarios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/encuestas">
               Encuestas 
              </NavLink>
            </li>
			<li className="nav-item">
              <NavLink className="nav-link" exact to="/secciones">
				Secciones
			</NavLink>
			</li>
			<li className="nav-item">
              <NavLink className="nav-link" exact to="/preguntas">
				Preguntas
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;