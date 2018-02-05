import React from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css';
import logo from './project_logo_circle.svg';

export default class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.state.hidden = true;
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState((prevState) => ({hidden: !prevState.hidden}))
    }
    render(){
        return (
            <header>
                <div className='logo'><img src={logo} alt='SilenceAware' className='logo-img'/>
                </div>
                <div className="logo-text">SilenceAware</div>
                <div className="hamburger" onClick={this.handleClick}><i className="fas fa-bars"></i></div>
                <nav className={this.state.hidden ? "hidden" : "display"}>
                    <NavLink to='/' exact className='nav-link' activeClassName='selected' onClick={this.handleClick}>Home</NavLink>
                    <NavLink to='/register' className='nav-link' activeClassName='selected' onClick={this.handleClick}>Register</NavLink>
                    <NavLink to='/dashboard' className='nav-link' activeClassName='selected' onClick={this.handleClick}>Dashboard</NavLink>
                </nav>
            </header>
        )
    }
}