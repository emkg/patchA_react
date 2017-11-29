import React from 'react';



export default class Change extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      date_created: "",//timestamp(),
      requestUser: "",
      requestUserEmail: "",
      whatwhy: "",
      how: "",
      servers: [],
      resources: "",
      softwareSystems: "",
      duration: 0,
      isApproved: 0,
      approvedBy: "",
      approvedDate: "",
      approvedTime: "",
      notApprovedReason: "",
      isExpired: 0,
    };

  }

  render() {
    return (
      <div></div>
    );
  }
}
