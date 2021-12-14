import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Agregar.css';
import apisource from './apisource';
import ReactGA from 'react-ga';

function Agregar(props) {
    let params = useParams();

    const navigate = useNavigate();
    
    const [poke1, setPoke1] = useState({

    });
    const [poke2, setPoke2] = useState({

    });
    const [poke3, setPoke3] = useState({

    });
    const [pokeId, setPokeId] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [placeToSend, setPlaceToSend] = useState(0);
    const [justification, setJustification] = useState('');
    const [muyCorto, setMuyCorto] = useState(false);
    const [mostrarModalExito, setMostrarModalExito] = useState(false);

    useEffect(() => {
        const fetchPokes = async () => {
            const data = await fetch(`${apisource}/pokes`);
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
            const data2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.poke}`)
            const obj = await data2.json();
            setPokeId(obj.id);
        };
        fetchPokes();
        ReactGA.pageview(window.location.pathname + window.location.search);
    },[params.poke]);

    
    const handleClickPrincipal = () => {
        setPlaceToSend(1);
        setMostrarModal(true);
    }
    const handleClickSecundario = () => {
        if (poke2.name) {
            setPlaceToSend(3);
        } else {
            setPlaceToSend(2);
        }
        setMostrarModal(true);
    }

    const handleClickModal = async () => {
        //enviamos: place, id, name, justification
        if (justification.length < 10) {
            setMuyCorto(true);
        } else {
            setMuyCorto(false);
            const datosAgregar = {
                place: placeToSend,
                id: pokeId,
                name: params.poke,
                justification: justification
            };
            const data = await fetch(`${apisource}/agregar`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(datosAgregar)
            });
            if (data.status === 200) {
                setMostrarModal(false);
                setMostrarModalExito(true);
            } else {
                console.log(data.status);
            }
        }
       
    }

    const handleChangeJust = ({target}) => {
        setJustification(target.value);
    }

    const handleClickModalAgregado = () => {
        navigate(`/${props.username}`);
    }
    
    return (
    <div>
        <div className='container-agregar-pokemon'>
            <h1>Agregar {params.poke}</h1>
            <img alt={params.poke} src={pokeId ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png` : ''}/><br />
            <button onClick={handleClickPrincipal} className={poke1.name ? 'quitar' : ''}>Agregar principal</button> <br />
            <button onClick={handleClickSecundario} className={(poke2.name && poke3.name) ? 'quitar' : ''}>Agregar secundario</button> <br />
            <p className={(poke1.name && poke2.name && poke3.name) ? '' : 'quitar'}>No te queda espacio para agregar a {params.poke}, crea otra cuenta (proximamente, borrar pokemones)</p>
        </div>
        <div className='container-pokemones-actuales'>
            <h1>Pokemones actuales</h1>
            <h2>Pokemon principal</h2>
            <div className='container-pokemon'>
                <h3>{poke1.name ? poke1.name : 'vacío'}</h3>
                <img className={poke1.name ? '' : 'quitar'} alt={poke1.name} src={poke1.name ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke1.id_pokedex}.png` : ''}/>
            </div>
            <h2>Pokemones secundarios</h2>
            <div className='container-pokemon'>
                <h3>{poke2.name ? poke2.name : 'vacío'}</h3>
                <img className={poke2.name ? '' : 'quitar'} alt={poke2.name} src={poke2.name ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke2.id_pokedex}.png` : ''}/>
            </div>
            <div className='container-pokemon'>
                <h3>{poke3.name ? poke3.name : 'vacío'}</h3>
                <img className={poke3.name ? '' : 'quitar'} alt={poke3.name} src={poke3.name ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke3.id_pokedex}.png` : ''}/> 
            </div>
        </div>
        {/* modal de justificación*/}
        <div className={mostrarModal ? 'modal' : 'quitar'}>
            <section className='modal-main'>
                <p className='justifica'>Justifica tu elección</p>
                <textarea minLength="10" value={justification} onChange={handleChangeJust} rows='5' placeholder='Está chido y ... (mínimo 10 caracteres)'>
                </textarea>
                <p className={muyCorto ? 'muy-corto' : 'quitar muy-corto'}>Justificación muy corta!</p>
                <button onClick={handleClickModal} className='button-add'>Agregar!</button>
                <p onClick={() => setMostrarModal(false)} className='regresar-modal'>Regresar</p>
            </section>
        </div>
        {/* modal de éxito*/}
        <div className={mostrarModalExito ? 'modal' : 'quitar'}>
            <section className='modal-main'>
                <p className='agregado'>Pokemón agregado!</p>
                <button onClick={handleClickModalAgregado} className='button-continue'>Continuar</button>
            </section>
        </div>
        
    </div>)
}

export default Agregar;