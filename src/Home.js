import { Link } from 'react-router-dom'
import React from 'react';
import './Home.css';

function Home(props) {
    return (
        <div>
        <main>
            <h1>Escoje a tus pokemones favoritos!</h1>
            <Link to='/lista'>
                <button>
                    Ver pokemones
                </button>
            </Link>
            <Link to='/login'>
                <p className={!props.username ? '' : 'ocultar'}>Iniciar sesión</p>
            </Link>
        </main>
        <div className='descripcion'>
            <h1>Selecciona tus 3 pokemones favoritos</h1>
            <ul>
                <li>Busca pokemones</li>
                <li>Selecciona los que te gusten</li>
                <li>Ve los pokemones de otros usuarios</li>
            </ul>
        </div>
        </div>
    );
  }
  
  export default Home;