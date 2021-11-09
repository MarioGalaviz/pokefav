import { Link } from 'react-router-dom'
import React from 'react';
import Usuarios from './Usuarios';

function Home() {
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
                <p>Iniciar sesión</p>
            </Link>
        </main>
        <Usuarios />
        </div>
    );
  }
  
  export default Home;