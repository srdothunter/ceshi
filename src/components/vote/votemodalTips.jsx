import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";

class VoteModalTips extends Component {
    render() {
        let {handleClose, showTips,handleConfirm} = this.props;
        return <Modal show={showTips} onHide={handleClose} centered={true}>
            <Modal.Header closeButton>
                <Modal.Title>Are you absolutely sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>This action cannot be undone.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>;
    }
}

export default VoteModalTips;
