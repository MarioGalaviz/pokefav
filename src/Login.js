import React, { useState } from 'react';
import './Login.css'
import { Link } from 'react-router-dom';
import apisource from './apisource';


function Login(props) {
    const [usuario,setUsuario] = useState('');
    const [contra,setContra] = useState('');
    const [crear, setCrear] = useState(false);
    const [usuarioCreado, setUsuarioCreado] = useState(false);
    const [contraIncorrecta, setContraIncorrecta] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);
    const [errorSignin, setErrorSignin] = useState(false);
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [usuarioExistente, setUsuarioExistente] = useState(false);
    
    const handleChangeUsuario = ({ target }) => {
        const { value } = target;
        setUsuario(value);
    };
    const handleChangeContra = ({ target }) => {
        const { value } = target;
        setContra(value);
    }
    const handleClickCrear = () => {
        setCrear(!crear)
    }
    const handleClickNext = async () => {
        if (!crear) {
            //iniciar sesión
            login();
        } else {
            //crear cuenta + iniciar sesión
            await signIn();
            await setTimeout(() => login(), 500);

        }
    }


    const login = async () => {
        const datosLogin = {username: usuario, password: contra};
        const data = await fetch(`${apisource}/login`, {
            credentials: 'include',
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(datosLogin)
        });
        
        if (data.status === 401) {
            setContraIncorrecta(true);
        } else if (data.status === 200) {
            setUsuarioCreado(!usuarioCreado);
            const respuesta = await data.json();
            console.log(respuesta);
            setNombreUsuario(respuesta.username);
            props.cambiarUsername(respuesta.username);
        } else {
            setErrorLogin(true);
        }
        
    }

    const signIn = async () => {
        const datosLogin = {username: usuario, password: contra};
        const data = await fetch(`${apisource}/signin`, {
            credentials: 'include',
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(datosLogin)
        });
        if (data.status === 403) {
            setUsuarioExistente(true);
        } else if (data.status === 200) {
            console.log('Usuario creado');
        } else {
            setErrorSignin(true);
        }
    }

    if (usuarioCreado) {
        return (
        <div>
            <h1>Bienvenido {nombreUsuario}!</h1>
            <Link to={`/${nombreUsuario}`}>
                <p>Ir a mis pokes</p>
            </Link>
        </div>
        )
    } else {
        return (
            <div className='login'>
                <h1>{!crear ? 'Iniciar sesión' : 'Crear cuenta'}</h1>
                <div className='usuario'>
                    <label htmlFor='usuario'>{crear ? 'Usuario nuevo' : 'Usuario'}</label> <br/>
                    <input id='usuario' value={usuario} onChange={handleChangeUsuario} maxLength='12' placeholder='max 12 caracteres'></input> <br/> 
                </div>
                <div className='contra'>
                    <label htmlFor='contra'>Contraseña</label> <br/>
                    <input id='contra' value={contra} type='password' onChange={handleChangeContra} maxLength='12' placeholder='max 12 caracteres'></input>   
                    <p className='contra-incorrecta'>{contraIncorrecta ? 'Usuario o contraseña incorrecta' : ''}{errorLogin ? 'Error login' : ''}{errorSignin ? 'Error signin' : ''}</p>
                    <p className='contra-incorrecta'>{usuarioExistente ? 'Usuario ya registrado' : ''}</p>
                </div>
                <button onClick={handleClickNext}>Siguiente</button>
                <p onClick={handleClickCrear}>{crear ? 'Iniciar sesión' : 'Crear cuenta'}</p>
            </div>
        )}
}

export default Login;