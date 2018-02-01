import React from 'react';
import '../index.css';
import logo from './project_logo.svg';

const Home = () => (
    <div className="container">
        <h1> SilentAware </h1>
        <div className="full-logo">
            <img src={logo} alt="No birds were harmed in the making of this logo" className="full-logo-img"/>
        </div>
        <p className="tagline">"Don't let silence ruin your day."</p>
        <p className="about">SilenceAware is a breakthrough, location aware, mobile first, and socially engaging platform utilizing edge-compute IoT sensors that will alert you to any awkward silences. </p>
    </div>
)

export default Home;