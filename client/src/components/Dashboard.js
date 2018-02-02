import React from 'react';
import '../index.css';
import DateTime from 'react-datetime';
import './DateTime.css';

export default class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {};
        this.getEvents = this.getEvents.bind(this)
    }

    getEvents(){

    }

    render(){
        return (
            <div className="container">
                <h1>Dashboard</h1>
                <div className="form">
                    <form onSubmit={this.getEvents}>
                        <label htmlFor="after">
                        Starting Time:
                        </label><br/>
                        <DateTime id="after"/>
                        <label htmlFor="before">
                        Ending Time:
                        </label><br/>
                        <DateTime id="before"/>
                    </form>
                
                </div>
            </div>
            
        )
    }
}