import React from 'react';
import './Change.css';
import ExceptionForm from './ExceptionForm';
import ChangeForm from './ChangeForm';

export default class Change extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data.id,
      status: this.props.data.status,
    };
  }

  getForm() {
    return this.state.status === 1 ? <ExceptionForm /> : <ChangeForm />;
  }

  render() {
    return (

        <div className='Change'>
          <h4><span className='label'> WHAT and WHY:</span>
          <span className='data'>{this.props.data.whatwhy}</span></h4>

          <h4><span className='label'> SUGGESTED PLAN:</span>
          <span className='data'>{this.props.data.how}</span></h4>

          <h4><span className='label'> AFFECTED SYSTEMS:</span>
          <span className='data'>{this.state.softwareSystems}</span></h4>

          <h4><span className='label'> EXPECTED DURATION:</span>
          <span className='data'>{this.props.data.duration}</span></h4>

          <h4><span className='label'> REQUESTED BY:</span>
          <span className='data'>{this.props.data.requestUser}</span></h4>

          <h4><span className='label'> SPECIFIC AFFECTED SYSTEMS:</span></h4>

          <div className='scrolly-list'></div>
          <br/>
       </div>

    );
  }
}
