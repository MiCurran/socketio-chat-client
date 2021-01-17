import React from 'react';
import { Channel } from './Channel';
import Modal from './modal'
import Button from 'react-bootstrap/Button'
import { MdAddBox } from "react-icons/md";

export class ChannelList extends React.Component {
  
    constructor(props) {
        super(props);
    
        this.state = { isOpen: false };
      }
    
      toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
        this.props.channelLoad()
      }

    handleClick = id => {
        this.props.onSelectChannel(id);
    }

    render() {

        let list = <div className="no-content-message">There are no channels to show</div>;
        if (this.props.channels && this.props.channels.map) {
            list = this.props.channels.map(c => <Channel key={c.id} id={c.id} name={c.name} participants={c.participants} onClick={this.handleClick} />);
        }
        return (
            <div className='channel-list'>
                {list}
        <Button onClick={this.toggleModal} variant="dark" size="lg" block>
        <MdAddBox size={22}/>
        ADD CHANNEL  
        </Button> 
           <Modal show={this.state.isOpen}
          onClose={this.toggleModal}>
          </Modal>
            </div>);
    }
}