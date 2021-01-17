import React from 'react';
import Toast from 'react-bootstrap/Toast'


export class Message extends React.Component {
    render() {
        return (
        
                <Toast >
    <Toast.Header closeButton={false} style={{backgroundColor:'#93bbf3'}}>
      <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
      <strong className="mr-auto">{this.props.senderName}</strong>
      <small>{this.props.date}</small>
    </Toast.Header>
    <Toast.Body>{this.props.text}</Toast.Body>
  </Toast>
            
        )
    }
}