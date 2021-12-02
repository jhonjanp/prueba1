import './App.css';
import Routing from "./Routing/Routing"
import NaBar from "./components/Navbar/Navbar"
import Footer from './components/footer/Footer';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import React from "react";

function App() {

  return (
    <Router>
      <div className="App">
        <NaBar />
        <Routing/>
        <Footer/>
      </div>
    </Router>
  );
}
  export default App;
