import React from 'react';
import './ChangeForm.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';

export default class ExceptionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      software: 'update all the computers because they need it',
      reason: 'reboot and install',
      user: 'Your name:',
      email: 'Your noaa.gov email:',
      exception: 1,
      succuss: false,
      redirect: '/'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    // stop event
    event.stopPropagation();
    event.preventDefault();

    this.setState({ success: !this.state.submitted });

    const data = this.state;
    console.log(data);
    await fetch('/api/addTicket.php', {
      'method' : 'post',
      'body' : JSON.stringify(data)
    });
  }

  render() {
      if(!this.state.success) {
        return (
          <div>
            <form name='exception' onSubmit={this.handleSubmit}>
            	<h3>Request to reschedule this update on a particular system.</h3>
              <p>What is the OS of the server?</p>
              <select name="software" value={this.state.software} onChange={this.handleChange}>
                <option value='Windows'>Windows</option>
                <option value='Mac'>Mac</option>
                <option value='Linux'>Linux</option>
              </select>
            	<p>Please provide a reason why you need this exception: </p>
            	<textarea type='text' name='reason' value={this.state.reason} onChange={this.handleChange} rows='4'></textarea>
            	<input type='text' name='user' value={this.state.user} onChange={this.handleChange} />
            	<input type='email' name='email' value={this.state.email} onChange={this.handleChange} required />
              <button><span>SUBMIT</span></button>
            </form>
          </div>
        );
      } else {
        return ( <Redirect push to={this.state.redirect} />);
      }
  }
}
