import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

function Nav(props) {
    return (
      <nav>
          <Link to='/'>
            <h1>Pokefav</h1>
          </Link>
          <Link to={`/${props.username}`}>
            <p>{props.username}</p>
          </Link>
      </nav>
    );
  }
  
  export default Nav;