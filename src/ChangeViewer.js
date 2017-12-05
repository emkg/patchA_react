import React from 'react';
import Change from './Change';
import ChangeForm from './ChangeForm';
import ExceptionForm from './ExceptionForm';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

export default class ChangeViewer extends React.Component {
  constructor(props) {
    super(props);
    //this.getChanges = this.getChanges.bind(this);
    this.state = { data: " " };
  }

  componentDidMount() {
    this.getChanges();
  }

 async getChanges() {
   const req = await fetch('/api/getChanges.php');
   if (!req.ok) {
     throw req;
   }

   const data = await req.json();
   let changes = [];
   data.forEach(function(change) {
      console.log(change);
      changes.push(<Change data={change} />)
   });
   this.setState({changes});
  }

  render() {
    const {changes} = this.state;

    return (
      <Router>
         <div>
           <ul>
             <Link to="/">Alerts</Link>
             <br/>
             <Link to="/change">Request an IT Change</Link>
           </ul>

           <hr/>

           <Route exact path="/" render={ () =>  <div>{changes}</div> }/>
           <Route path="/change" component={ChangeForm}/>
         </div>
       </Router>


    );
  }
}
