import React from 'react';
import './ChangeForm.css';
import {
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';

export default class ExceptionForm extends React.Component {

  render() {
    return (
      <div>
        <form name='exception'>
        	<h3>Request to reschedule this update on a particular system.</h3>
          <p>What is the OS of the server?</p>
          <select name="os">
            <option value='Windows'>Windows</option>
            <option value='Mac'>Mac</option>
            <option value='Linux'>Linux</option>
          </select>
        	<p>Please provide a reason why you need this exception: </p>
        	<textarea type='text' name='reason' rows='4'></textarea>
        	<input type='text' name='user' placeholder='Your name:'/>
        	<input type='text' name='email' placeholder='Your email:' required pattern='\(@noaa.gov)$'/>
          <button><span>SUBMIT</span></button>
        </form>
      </div>
    );
  }
}
