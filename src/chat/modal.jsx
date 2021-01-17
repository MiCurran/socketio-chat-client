import React from 'react';
import PropTypes from 'prop-types';
import AddChannel from './AddChannel'
import Button from 'react-bootstrap/Button'


class Modal extends React.Component {
    
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30,
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
    };
//so were going to add react hook form and on submit it handles validation and then it will make a post request to 
//the server with the request body being the channel name supplied in the form and the default values for participants, sockets and id = greatest id in array +1
    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          {this.props.children}
            <div className="modal-content">
                <h4>Let's create a new channel!</h4>
                <AddChannel onClose={this.props.onClose}/>
            </div>
          <div className="footer">
            <Button variant="danger"onClick={this.props.onClose}>
              Close
            </Button>          
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;