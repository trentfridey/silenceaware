import React from 'react';
import '../index.css';
import DateTime from 'react-datetime';
import './DateTime.css';

export default class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {};
        this.state.events = []
        this.getEvents = this.getEvents.bind(this)
    }

    getEvents(after, before){
        before = before.toISOString();
        after = after.toISOString();
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

    componentDidMount(){
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
                    <form onSubmit={this.getEvents}>
                        <label htmlFor="after">
                        Starting Time:
                        </label><br/>
                        <DateTime id="after" inputProps={{placeholder: (new Date(Date.now()-1000*60*60)).toLocaleString()}}/>
                        <label htmlFor="before">
                        Ending Time:
                        </label><br/>
                        <DateTime id="before" inputProps={{placeholder: (new Date()).toLocaleString()}}/>
                        <button>Submit</button>
                    </form>
                </div>
                <div className="event-display">
                    {events? events.map((event) => (
                        <div key={event.event_id} className="event">
                            <div className={event.end_time === "null"? "active": "event-header"}>{event.end_time === "null"? "Active Event": "Event"}</div>
                            <div className="event-body">
                                <p className="start">Start: {(new Date(event.start_time)).toLocaleString()}</p>
                                <p className="end">{event.end_time==="null"? null: `End Time: ${(new Date(event.end_time)).toLocaleString()}`}</p>
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