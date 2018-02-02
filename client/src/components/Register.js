import React from 'react';
import '../index.css';

class Profile{
    constructor(firstName, lastName, email){
        this.first_name = firstName
        this.last_name = lastName
        this.email = email
    }
    getData(){
        return ({"last_name": this.last_name,
                "first_name": this.first_name,
                "email": this.email})
    }
}

export default class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.registerPost = this.registerPost.bind(this)
    }

    registerPost(e){
        e.preventDefault();
        const data = new FormData(e.target);
        var profile = new Profile(data.get('first_name'), data.get('last_name'), data.get('email'))
        const url = "https://ax65c8djp8.execute-api.us-west-2.amazonaws.com"

        fetch(url+"/api/register",
            {
                method: 'POST',
                mode: 'no-cors',
                headers: new Headers({'Content-Type':'application/json'}),
                body: profile
            })
        // .then((res) => (res.json())).catch((err) => (console.log('Error: ', err)))
        // .then(resJSON => console.log('Success:', resJSON))
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