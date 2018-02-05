import React from 'react';
import '../index.css';
import DateTime from 'react-datetime';
import './DateTime.css';
//import {Validate, ValidateGroup, ErrorMessage} from 'react-validate';

// Validation setup

// const validateAfter = (after) => {
//     validateRange(after, this.)
// }

// const validateBefore = (before) => {

// }

// const validateRange = (after, before) => {

// }

// Main Component

export default class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {};
        this.state.events = []
        this.state.loading = true;
        this.getEvents = this.getEvents.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getEvents(after, before){
        before = (new Date(before)).toISOString();
        after = (new Date(after)).toISOString();
        var url = "https://event-server.glitch.me"
        //const url = "https://ax65c8djp8.execute-api.us-west-2.amazonaws.com"
        return fetch(`${url}/events/${after}/${before}`,
            {
                method: 'GET',
                mode: 'cors',
                headers: {'Content-Type':'application/json'},
            }).then(res => res.json())
            .catch(err => {throw err})
    }

    handleSubmit(e){
        e.preventDefault();
        const data = new FormData(e.target)
        let before = data.get("before");
        let after = data.get("after");
        if(after === null || before === null){
            after = (new Date(Date.now()-1000*60*60));
            before = (new Date());
        }
        this.getEvents(after, before).then(data =>{
            let activeEvents = data.filter((ev)=> ev.end_time === "null")
            let pastEvents = data.filter((ev)=>ev.end_time !== "null")
            pastEvents.sort((a,b) => (
                (new Date(a.start_time)).getTime() - (new Date(b.start_time)).getTime()
            ))
            activeEvents.push(...pastEvents)
            this.setState({events: activeEvents})
        })
    }

    componentWillMount(){
        this.setState({loading: true})
    }

    componentDidMount(){
        this.setState({loading: false})
        this.getEvents((new Date(Date.now()-1000*60*60)), (new Date()))
        .then(data =>{
            let activeEvents = data.filter((ev)=> ev.end_time === "null")
            let pastEvents = data.filter((ev)=>ev.end_time !== "null")
            pastEvents.sort((a,b) => (
                (new Date(a.start_time)).getTime() - (new Date(b.start_time)).getTime()
            ))
            activeEvents.push(...pastEvents)
            this.setState({events: activeEvents})
        })
    }

    render(){
        const events = this.state.events;
        return (
            <div className="container">
                <h1>Dashboard</h1>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        {/* <ValidateGroup> */}
                        <label htmlFor="after">
                        Starting Time:
                        </label><br/>
                        <DateTime id="after" inputProps={{placeholder: (new Date(Date.now()-1000*60*60)).toLocaleString()}}/>
                        <label htmlFor="before">
                        Ending Time:
                        </label><br/>
                        <DateTime id="before" inputProps={{placeholder: (new Date()).toLocaleString()}}/>
                        <button type="submit">Submit</button>
                        {/* </ValidateGroup> */}
                    </form>
                </div>
                {this.state.loading? <p>Loading...</p> : null}
                <div className="event-display">
                    {events? events.map((event) => (
                        <div key={event.event_id} className="event">
                            <div className={event.end_time === "null"? "active": "event-header"}>{event.end_time === "null"? "Active Event": "Event"}</div>
                            <div className="event-body">
                                <p className="start">Start: {(new Date(event.start_time)).toLocaleString()}</p>
                                <p className="end">{event.end_time==="null"? null: `End: ${(new Date(event.end_time)).toLocaleString()}`}</p>
                                <p className="description">Description: {event.description}</p>
                                <p className="id">Event ID: {event.event_id}</p>
                            </div>
                        </div>
                    )): null}
                </div>
            </div>
            
        )
    }
}