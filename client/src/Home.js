import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react';
import './Home.css';
import ReactGA from 'react-ga';

function Home(props) {
    
    let navigate = useNavigate()

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    },[])
    
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
            <h2 onClick={() => navigate('/todos')}>Ver todos los usuarios</h2>
        </div>
        </div>
    );
  }
  
  export default Home;