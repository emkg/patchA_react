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
   this.setState({data});
  }

  render() {
    const {data} = this.state;
    console.log(data);
    return (
      <div>{ data[0].date }</div>
    );
  }
}
