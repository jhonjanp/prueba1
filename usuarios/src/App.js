import './App.css';
import Routing from "./Routing/Routing"
import Navbar from "./components/Navbar/Navbar"
import {
  BrowserRouter as Router,
} from "react-router-dom";
import React from "react";

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routing/>
      </div>
    </Router>
  );
}
  export default App;
