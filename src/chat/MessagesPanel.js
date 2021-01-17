import React, { useEffect, useRef } from 'react'
import { Message } from './Message';

export class MessagesPanel extends React.Component {
 
    state = { input_value: '' }
    send = () => {
        if (this.state.input_value && this.state.input_value !== '') {
            this.props.onSendMessage(this.props.channel.id, this.state.input_value);
            this.setState({ input_value: '' });
        }
    }
    handleInput = e => {
        this.setState({ input_value: e.target.value });
    }
    componentDidMount() {
        this.scrollToBottom();
      }
    
      componentDidUpdate() {
        this.scrollToBottom();
      }
    
      scrollToBottom() {
        this.el.scrollIntoView({ behavior: 'smooth' });
      }
    render() {

        let list = <div className="no-content-message">NO MESSAGES TO SHOW <br></br>SEND A MESSAGE AND SAY HELLO!</div>;
        if (this.props.channel && this.props.channel.messages) {
            list = this.props.channel.messages.map(m => <Message key={m.id} id={m.id} senderName={m.senderName} text={m.text} date={m.date}/>);
        }
        return (
            <div className='messages-panel'>
                <div className="messages-list" ref="messageList">{list}
                <div ref={el => { this.el = el; }} />
                </div>
                
                {this.props.channel &&
                    <div className="messages-input">
                        <input type="text" onChange={this.handleInput} value={this.state.input_value} />
                        <button onClick={this.send}>Send</button>
                    </div>
                }
            </div>);
    }

}