import React, { useState, useEffect } from 'react';
import './Usuarios.css'
import { useNavigate } from 'react-router-dom'
import apisource from './apisource';
import ReactGA from 'react-ga';

function Usuarios(props) {
    
    const [usuarios, setUsuarios] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
        const data = await fetch(`${apisource}/pokesusers`);
        const list = await data.json();
        setUsuarios(list); 
      };
        fetchUsuarios();
        ReactGA.pageview(window.location.pathname + window.location.search);
      },[props.username]);
    
    return(
        <div className='usuarios'>
            <h1 className='titulo'>Usuarios</h1>
            {
                usuarios.map(usuario => (
                    <div key={usuario.username} className='containerUsuario'>
                        <h1 onClick={()=> navigate(`/perfil/${usuario.username}`)}>{usuario.username}</h1>
                        {usuario.id1 ? <img alt={usuario.name1} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${usuario.id1}.png`}/>: ''}
                        {usuario.id2 ? <img alt={usuario.name2} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${usuario.id2}.png`}/>: ''}
                        {usuario.id3 ? <img alt={usuario.name3} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${usuario.id3}.png`}/>: ''}
                    </div>
                ))
            }
        </div>
    )
}

export default Usuarios;