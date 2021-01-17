import React from 'react';
import { ChannelList } from './ChannelList';
import './chat.scss';
import  {MessagesPanel}  from './MessagesPanel';
import socketClient from "socket.io-client";
import date from 'date-and-time';
const SERVER = 'https://socketiochatserver.herokuapp.com';
const now = new Date();
export class Chat extends React.Component {

    state = {
        channels: null,
        socket: null,
        channel: null
    }
    socket;
    componentDidMount() {
        this.loadChannels();
        this.configureSocket();
    }

    configureSocket = () => {
        var socket = socketClient(SERVER);
        socket.on('connection', () => {
            if (this.state.channel) {
                this.handleChannelSelect(this.state.channel.id);
            }
        });
        socket.on('channel', channel => {
            
            let channels = this.state.channels;
            channels.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                }
            });
            this.setState({ channels });
        });
        socket.on('message', message => {
            
            let channels = this.state.channels
            channels.forEach(c => {
                if (c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            this.setState({ channels });
        });
        this.socket = socket;
    }

    loadChannels = async () => {
        fetch('https://socketiochatserver.herokuapp.com/getChannels').then(async response => {
            let data = await response.json();
            this.setState({ channels: data.channels });
        })
    }

    handleChannelSelect = id => {
        let channel = this.state.channels.find(c => {
            return c.id === id;
        });
        this.setState({ channel });
        this.socket.emit('channel-join', id, ack => {
        });
    }
    
    handleSendMessage = (channel_id, text) => {
        this.socket.emit('send-message', { channel_id, text, senderName: this.socket.id, id: Date.now(), date:date.format(now,'MM/DD hh:mm A')});//need to change senderName in here
    }

    render() {

        return (
            <div className='chat-app'>
                <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect} channelLoad={this.loadChannels}/>
                <MessagesPanel onSendMessage={this.handleSendMessage} channel={this.state.channel} />
            </div>
        );
    }
}