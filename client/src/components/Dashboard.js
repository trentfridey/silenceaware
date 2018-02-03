import React from 'react';
import '../index.css';
import DateTime from 'react-datetime';
import './DateTime.css';

export default class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {};
        this.state.events = {}
        this.getEvents = this.getEvents.bind(this)
    }

    getEvents(after, before){
        before = before.toISOString;
        after = after.toISOString;
        return fetch(`https://ax65c8djp8.execute-api.us-west-2.amazonaws.com/api/events?before=${before}&after=${after}`,
            {
                method: 'GET',
                mode: 'no-cors',
                headers: new Headers({'Content-Type':'application/json'}),
            }).then(res => res.json())
            .catch(err => {throw err});
    }

    componentDidMount(){
        this.getEvents((new Date(Date.now()-1000*60*60)), (new Date()))
        .then(data => this.setState({events: data}))
    }

    render(){
        const {events} = this.state;
        return (
            <div className="container">
                <h1>Dashboard</h1>
                <div className="form">
                    <form onSubmit={this.getEvents}>
                        <label htmlFor="after">
                        Starting Time:
                        </label><br/>
                        <DateTime id="after" inputProps={{placeholder: (new Date(Date.now()-1000*60*60))}}/>
                        <label htmlFor="before">
                        Ending Time:
                        </label><br/>
                        <DateTime id="before" inputProps={{placeholder: new Date()}}/>
                        <button>Submit</button>
                    </form>
                </div>
                <div className="event-display">
                    {events.map((event) => (
                        <div key={event.id} className={event.end_time === null? "event active": "event"}>
                            <h2>Event</h2>
                            <p className="start">{event.start_time}</p>
                            <p className="end">{event.end_time===null? "Active Event": `End Time: ${event.end_time}`}</p>
                            <p className="description">{event.description}</p>
                            <p className="id">{event.id}</p>
                        </div>
                    ))}
                </div>
            </div>
            
        )
    }
}