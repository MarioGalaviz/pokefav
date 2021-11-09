import React, { useState, useEffect } from 'react';
import './Usuarios.css'

function Usuarios() {
    
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
        const data = await fetch(
          `/users/2`
          );
        const list = await data.json();
        
        setUsuarios(list);
             
      };
        fetchUsuarios();
      },[]);
    
    return(
        <div className='usuarios'>
            <h1>Usuarios</h1>
            {
                usuarios.map(usuario => (
                    <div className='containerUsuario'>
                        <h1>{usuario.username}</h1>
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