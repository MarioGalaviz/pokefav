import './App.css';
import Nav from './Nav';
import Home from './Home';
import Lista from './Lista';
import Detalle from './Detalle';
import Login from './Login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/lista' exact element={<Lista />} />
          <Route path='/lista/:poke' element={<Detalle animate={true} />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
