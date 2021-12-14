import React, { useState, useEffect } from 'react';
import './Perfil.css'
import { useNavigate, useParams } from 'react-router-dom';
import apisource from './apisource';
import ReactGA from 'react-ga';

function PerfilOtro(props) {

    const params = useParams();
    
    const [poke1, setPoke1] = useState({

    });
    const [poke2, setPoke2] = useState({

    });
    const [poke3, setPoke3] = useState({

    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPokes = async () => {
            const data = await fetch(`${apisource}/pokes/${params.user}`);
            const lista = await data.json();
            const arrFiltrado1 = lista.filter(poke => poke.place === 1);
            if (arrFiltrado1.length > 0) {
                setPoke1(arrFiltrado1[0]);  
            }
            const arrFiltrado2 = lista.filter(poke => poke.place === 2);
            if (arrFiltrado2.length > 0) {
                setPoke2(arrFiltrado2[0]);  
            }
            const arrFiltrado3 = lista.filter(poke => poke.place === 3);
            if (arrFiltrado3.length > 0) {
                setPoke3(arrFiltrado3[0]);  
            }
        };
        fetchPokes();
        ReactGA.pageview(window.location.pathname + window.location.search);
    },[params.user]);
    
    return (<div className='perfil'>
        <h1 className='titulo'>Pokemones de {params.user}</h1>
        <div className='container-first'>
            <h1>{poke1.name}</h1>
            <img alt={poke1.name} src={poke1.name ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke1.id_pokedex}.png` : ''}/>
            <p>{poke1.justification}</p>
            <p>{poke1.name ? '' : 'no tiene'}</p>
        </div>
        <div className='container-second'>
            <div className='container-second-pokes'>
                <h1>{poke2.name}</h1>
                <img alt={poke2.name} src={poke2.name ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke2.id_pokedex}.png` : ''}/>
                <p>{poke2.justification}</p>
                <p>{poke2.name ? '' : 'no tiene'}</p>
            </div>
            <div className='container-second-pokes'>
                <h1>{poke3.name}</h1>
                <img alt={poke3.name} src={poke3.name ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke3.id_pokedex}.png` : ''}/>
                <p>{poke3.justification}</p>
                <p>{poke3.name ? '' : 'no tiene'}</p>
            </div>
        </div>
        <div className='container-otros'>
            <p onClick={() => navigate(`/usuarios`)}>Ver pokemones de otros usuarios</p>
        </div>
        
    </div>);
}

export default PerfilOtro;