import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: this.props.message
    };
  };

  render() {
    return (
      <div className='row center-page'>
        <h2>{this.state.message}</h2>
      </div>
    )
  };

};

export default Message;
