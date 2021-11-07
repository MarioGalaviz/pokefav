import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
      <nav>
          <Link to='/'>
          <h1>Pokefav</h1>
          </Link>
      </nav>
    );
  }
  
  export default Nav;