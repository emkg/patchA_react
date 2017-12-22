import React from 'react';
import Alert from './Alert';
import AlertForm from './AlertForm';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

export default class Viewer extends React.Component {
  constructor(props) {
    super(props);
    //this.getAlerts = this.getAlerts.bind(this);
    this.state = { data: " " };
  }

  componentDidMount() {
    this.getAlerts();
  }

 async getAlerts() {
   const req = await fetch('/api/getAlerts.php');
   if (!req.ok) {
     throw req;
   }

   const data = await req.json();
   let alerts = [];
   data.forEach(function(alert) {
      console.log(alert);
      alerts.push(<Alert data={alert} />)
   });
   this.setState({alerts});
  }

  render() {
    const {alerts} = this.state;

    return (
      <Router>
         <div>
           <ul>
             <Link to="/">Alerts</Link>
             <br/>
             <Link to="/form">Create an IT Alert</Link>
           </ul>

           <hr/>

           <Route exact path="/" render={ () =>  <div>{alerts}</div> }/>
           <Route path="/form" component={AlertForm}/>
         </div>
       </Router>


    );
  }
}
