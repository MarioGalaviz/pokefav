import './App.css';
import Nav from './Nav';
import Home from './Home';
import Lista from './Lista';
import Detalle from './Detalle';
import Login from './Login';
import Perfil from './Perfil';
import Agregar from './Agregar';
import Usuarios from './Usuarios';
import PerfilOtro from './PerfilOtro';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import apisource from './apisource';
const axios = require('axios');

axios.defaults.withCrendentails = true;

function App() {
  const [username, setUsername] = useState('');
  const [tipo, setTipo] = useState('fire');

  const cambiarUsername = (nuevoUsername) => {
    checkUsername();
    setUsername(nuevoUsername);
    
  }

  useEffect(() => {
    checkUsername();
  },[])

  const checkUsername = async () => {
    const data = await fetch(`${apisource}/check`,{
      credentials: 'include',
      withCredentials: true,
      headers: {
        "Accept": "application/json"
        }
    });
    const lista = await data.json();      
    if(data.status === 200) {
      setUsername(lista[0].username)
    }
    // axios.get(`${apisource}/check`,{withCredentials: true})
    //   .then(function(response) {
    //     response.json()
    //   })
    //   .then(function(response) {
    //     setUsername(response[0].username)
    //   })

  };

  const cambiarTipo = (value) => {
    setTipo(value);
    };

  return (
    <Router>
      <div>
        <Nav username={username}/>
        <Routes>
          <Route path='/' exact element={<Home username={username}/>} />
          <Route path='/lista' exact element={<Lista tipo={tipo} cambiarTipo={cambiarTipo} />} />
          <Route path='/lista/:poke' element={<Detalle username={username}/>} />
          <Route path='/login' element={<Login cambiarUsername={cambiarUsername}/>} />
          <Route path='/:user' element={<Perfil cambiarUsername={cambiarUsername} username={username}/>} />
          <Route path='/agregar/:poke' element={<Agregar username={username}/>} />
          <Route path='/usuarios' element={<Usuarios />} />
          <Route path='/perfil/:user' element={<PerfilOtro/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
