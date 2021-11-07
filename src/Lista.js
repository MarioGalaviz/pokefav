import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Lista.css';

function Lista() {
  
  const [tipo, setTipo] = useState('fire');

  const cambiarTipo = (value) => {
    setTipo(value);
    };

  useEffect(() => {
    const fetchList = async () => {
    const data = await fetch(
      `https://pokeapi.co/api/v2/type/${tipo}`
      );
    const list = await data.json();
    
    setLista(list.pokemon);
         
  };
    fetchList();
  },[tipo]);

  const [lista, setLista] = useState([{
    pokemon: {
      name: 'cargando'
    }
  }]);

  

    return (
      <div>
        <Select onChange={cambiarTipo} tipo={tipo}/>
        <Display lista={lista}/>
      </div>
    )
  };

function Select(props) {
  
  const handleChange = ({ target }) => {
    const { value } = target;
    props.onChange(value)
  }

  const tipos = [
    {
      label: 'Fuego',
      value: 'fire'
    },
    {
      label: 'Agua',
      value: 'water'
    },
    {
      label: 'Dragón',
      value: 'dragon'
    },
    {
      label: 'Roca',
      value: 'rock'
    }
  ];

  return (
    <div className='select-type'>
        <h1>Tipo:</h1>
        <select key={props.tipo} value={props.tipo} onChange={handleChange}>
          {tipos.map(
            (type,index) => (
              <option key={index} value={type.value}>{type.label}</option>
            )
          )}
        </select>
    </div>
  );
}

function Display(props) {
  
  const listaPokes = props.lista;
  return (
    <div className='display'>
      <ul>
      {
        listaPokes.map((poke) => 
            (
              <Link key={poke.pokemon.name} to={`/lista/${poke.pokemon.name}`}>
              <li key={poke.pokemon.name}>{poke.pokemon.name}</li>
              </Link>
            )
          )
      } 
      </ul>
    </div>
  );
}
  
  export default Lista;