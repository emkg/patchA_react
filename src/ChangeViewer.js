import React from 'react';
import Change from './Change';

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
    //console.log();
    return (
      <div>{ changes }</div>
    );
  }
}
