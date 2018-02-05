import React from 'react';
import '../index.css';
import {Validate, ValidateGroup, ErrorMessage} from 'react-validate';
import validator from 'validator';

// Validation setup

const validateEmail = (value) => {
    return (validator.isEmail(value))
}

const errorMessages = {email: 'Please input a valid email address'}

// Main Component

export default class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.registerPost = this.registerPost.bind(this)
    }

    registerPost(e){
        e.preventDefault();
        const data = new FormData(e.target);
        const profile = {first_name: data.get('first_name'), last_name: data.get('last_name'), email: data.get('email')}
        //const url = "https://ax65c8djp8.execute-api.us-west-2.amazonaws.com"
        const url = "https://event-server.glitch.me"

        fetch(`${url}/register`,
            {
                method: 'POST',
                mode: 'cors',
                //credentials: 'include',
                headers: {'Content-Type':'application/json', 'Accept':'application/json'},
                body: JSON.stringify(profile)
            })
         .then((res) => {if(!res.ok){
             throw Error(res.statusText);
         } return res
        })
         .catch(err => console.log(err))
         .then(json => console.log(json))
         .then(this.props.history.push('/dashboard'))
    }

    render(){
        return (
            <div className="container">
                <h1>Register</h1>
                
                <div className="form">
                    <form onSubmit={this.registerPost}>
                        
                        <ValidateGroup>
                        <label htmlFor="first_name">
                        First Name*:
                        </label>
                        <br/>
                        <Validate>
                        <input id="first_name" name="first_name" type="text"></input>
                        </Validate>
                        <br/>
                        <label htmlFor="last_name">
                        Last Name*:
                        </label>
                        <br/>
                        <Validate>
                        <input id="last_name" name="last_name" type="text"></input>
                        </Validate>
                        <br/>
                        <label htmlFor="email">
                        Email*:
                        </label>
                        <br/>
                        <Validate validators={[validateEmail]}>
                        <input id="email" name="email" type="email"></input>
                        <ErrorMessage>{errorMessages.email}</ErrorMessage>
                        </Validate>
                        <br/>
                        
                        <button type="submit">Submit</button>
                        </ValidateGroup>
                    </form>
                    *Required
                </div>
            </div>
        )
    }
}