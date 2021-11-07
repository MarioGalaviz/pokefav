import React, { useState } from 'react';
import './Login.css'

function Login() {
    const [usuario,setUsuario] = useState('');
    const [contra,setContra] = useState('');
    const [crear, setCrear] = useState(false);
    
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
            </div>
            <button>Siguiente</button>
            <p onClick={handleClickCrear}>{crear ? 'Iniciar sesión' : 'Crear cuenta'}</p>
        </div>
    )
}

export default Login;