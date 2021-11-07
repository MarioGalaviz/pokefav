import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Detalle.css';



function Detalle({ animate }) {
    
    let params = useParams();

    const [pokemon, setPokemon] = useState({
        sprites: {},
        types: [],
        moves: [],
        name: '',
        stats: []
    });
    
    useEffect(() => {
        const fetchPokemon = async () => {
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.poke}`);
            const poke = await data.json();
            setPokemon(poke);
        };
        fetchPokemon();
        
    },[params.poke])

    
    
    
    return(<div>
        <Link to='/lista'>
        <p className='volver'>Volver a lista</p>
        </Link>
        <div className='lista'
        ><h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
        <img alt={pokemon.name} src={pokemon.sprites.front_default}/>    
        </div>
        <ul className='listaTipos'>
            {pokemon.types.map((tipo) => (
                <li key={tipo.type.name}>{tipo.type.name}</li>
            ))}
        </ul>
        <div className='estads'>
            <h1>Estadísticas</h1>
            {pokemon.stats.map((stat) => (
               <div key={stat.stat.name} className='estadsContainer'>
                    <h2>{stat.stat.name}</h2>
                    <p>{stat.base_stat}</p>
                </div> 
            ))}
        </div>
        <div className='movimientos'>
            <h2>Movimientos</h2>
            <ul className='listaMovimientos'>
                {pokemon.moves.map((movimiento) => (
                    <li key={movimiento.move.name}>{movimiento.move.name}</li>
                ))}
            </ul>
        </div>
        
        
        
    </div>)
};

export default Detalle;