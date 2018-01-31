import React from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css';
import logo from './project_logo_circle.svg';

export default class Header extends React.Component {
    render(){
        return (
            <header>
                <div className='logo'><img src={logo} alt='SilentAware' className='logo-img'/>
                </div>
                <div className="logo-text">SilentAware</div>
                <div className="hamburger"><i className="fas fa-bars"></i></div>
                <nav className="display">
                    <NavLink to='/' exact className='nav-link' activeClassName='selected'>Home</NavLink>
                    <NavLink to='/dashboard' className='nav-link' activeClassName='selected'>Dashboard</NavLink>
                    <NavLink to='/register' className='nav-link' activeClassName='selected'>Register</NavLink>
                </nav>
            </header>
        )
    }
}