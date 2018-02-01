import React from 'react';
import '../index.css';

export default class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.registerPost = this.registerPost.bind(this)
    }
    
    registerPost(e){
        e.preventDefault();
        const data = new FormData(e.target);
        var profile = {};
        data.forEach((v,k)=>(profile[k] = v))

        // fetch("https://ax65c8djp8.execute-api.us-west-2.amazonaws.com/api/register",
        //     {
        //         method: 'POST',
        //         content-type: 'application/json',
        //         body: profile
        //     }
        // )
    }

    render(){
        return (
            <div className="container">
                <h1>Register</h1>
                
                <div className="form">
                    <form onSubmit={this.registerPost}>
                        <label htmlFor="first_name">
                        First Name:
                        </label>
                        <br/>
                        <input id="first_name" name="first_name" type="text"></input>
                        <br/>
                        <label htmlFor="last_name">
                        Last Name:
                        </label>
                        <br/>
                        <input id="last_name" name="last_name" type="text"></input>
                        <br/>
                        <label htmlFor="email">
                        Email:
                        </label>
                        <br/>
                        <input id="email" name="email" type="email"></input>
                        <br/>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}