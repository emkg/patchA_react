import React from 'react';

export default class Notification extends React.Component {
  render() {
      switch(this.props.status) {
        case 1:
          return ( "alert" );
        case 0:
          return ( "created" );
        case -1:
          return ( "denied" );
      }
  }
}
