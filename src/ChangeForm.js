import React from 'react';
import './ChangeForm.css';

let title = "Change Form";
const stop = (e) => (e.stopPropagation(), e.preventDefault());
export default class ChangeForm extends React.Component {

  handleSubmit = async e => {
    stop(e);

    const data = new FormData(e.target);
    await fetch('/api/addTicket.php', {
      'method' : 'post',
      'body' : JSON.stringify(data)
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>{title}</h3>
          <p>What are the details of this request? Why should this change be implemented?
          Please include the consequences of not implementing this change.</p>
          <textarea type='text' rows='5' name='whatwhy'></textarea>
          <p>Provide a suggested implementation plan including contingency (rollback) plans.</p>
          <textarea type='text' name='how' rows='5'></textarea>
          <p>What is the timeframe for this change?</p>
          <textarea type='text' rows='2' name='duration'></textarea>
          <p>What software systems will be affected (if known)?</p>
          <select name='software'>
            <option value="Mac">Mac</option>
            <option value="Windows">Windows</option>
            <option value="Linux">Linux</option>
          </select>
          <input type='text' name='user'  placeholder='Your name:'/>
          <input type='text' name='email' placeholder='Your email:' required pattern='\(@noaa.gov)$' />
          <button type='submit'><span>SUBMIT</span></button>
        </form>
      </div>
    );
  }
}
