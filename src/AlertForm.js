import React from 'react';
import './AlertForm.css';
import { Redirect } from 'react-router-dom';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import "react-day-picker/lib/style.css";

let title = "Set Up an Alert";

const stop = (event) => (event.stopPropagation(), event.preventDefault());

export default class ChangeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: undefined,
      time: undefined,
      ticketID: undefined,
      software: undefined,
      duration: undefined,
      personalMessage: undefined,
      user: 'Your name:',
      email: 'Your noaa.gov email:',
      success: false,
      redirect: '/'
    };

    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDayChange = (day) => {
    this.setState({ selectedDay: day.toLocaleDateString() });
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = async event => {
    stop(event);

    const data = this.state;
    this.setState({ success: !this.state.success })
    console.log(data);
    await fetch('/api/createAlert.php', {
      'method' : 'post',
      'body' : JSON.stringify(data)
    });
  }
  render() {
    if(!this.state.success) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <h3>{title}</h3>
            <p>On what day will the change take place?</p>
            <DayPickerInput
                      placeholder='DD/MM/YYYY'
                      format="DD/MM/YYYY"
                      name='selectedDay'
                      onDayChange={this.handleDayChange} />
            <p>At what time:</p>
            <input    type='time'
                      name='time'
                      value={this.state.time}
                      onChange={this.handleChange}></input>
            <p>What is the ticket id for the ticket applicable to this service alert?</p>
            <input    type='text'
                      name='ticketID'
                      value={this.state.ticketID}
                      onChange={this.handleChange}></input>
            <p>What software systems will be affected (if known)?</p>
            <select name='software' value={this.state.software} onChange={this.handleChange}>
              <option value="Mac">Mac</option>
              <option value="Windows">Windows</option>
              <option value="Linux">Linux</option>
            </select>
            <input type='text'
                   name='user'
                   value={this.state.user}
                   onChange={this.handleChange}/>
            <input type='email'
                   name='email'
                   required
                   value={this.state.email}
                   onChange={this.handleChange} />
            <button type='submit'><span>SUBMIT</span></button>
          </form>
        </div>
      );
    } else {
      return ( <Redirect push to={this.state.redirect} />)
    }
  }
}
