import React from 'react';
import logo from '../images/logo.jpg'
import {Link} from 'react-router-dom';

const Logo = () => {
    return (
        <Link to={'/'}>
            <img className="w-100" src={logo} alt="logo"/>
        </Link>
    )
};

export default Logo;