import React from 'react';


export class Message extends React.Component {
    render() {
        return (
            <div className='message-item'>
                <div className='message-header'><b>{this.props.senderName}</b>
                <p>{this.props.date}</p></div>
                <div className='message-content'><span>{this.props.text}</span></div>
            </div>
        )
    }
}