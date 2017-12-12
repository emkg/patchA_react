import React from 'react';
import './ChangeForm.css';
import { Redirect } from 'react-router-dom';

let title = "Change Form";

const stop = (event) => (event.stopPropagation(), event.preventDefault());

export default class ChangeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whatwhy: 'update all the computers because they need it',
      how: 'reboot and install',
      duration: 'forever',
      software: '',
      user: 'Your name:',
      email: 'Your noaa.gov email:',
      exception: 0,
      success: false,
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
    stop(event);

    const data = this.state;
    this.setState({ success: !this.state.success })
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
          <form onSubmit={this.handleSubmit}>
            <h3>{title}</h3>
            <p>What are the details of this request? Why should this change be implemented?
            Please include the consequences of not implementing this change.</p>
            <textarea type='text'
                      rows='5'
                      name='whatwhy'
                      value={this.state.whatwhy}
                      onChange={this.handleChange}></textarea>
            <p>Provide a suggested implementation plan including contingency (rollback) plans.</p>
            <textarea type='text'
                      name='how'
                      rows='5'
                      value={this.state.how}
                      onChange={this.handleChange}></textarea>
            <p>What is the timeframe for this change?</p>
            <textarea type='text'
                      rows='2'
                      name='duration'
                      value={this.state.duration}
                      onChange={this.handleChange}></textarea>
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
