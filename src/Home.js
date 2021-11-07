import { Link } from 'react-router-dom'
import React from 'react';

function Home() {
    return (
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
    );
  }
  
  export default Home;