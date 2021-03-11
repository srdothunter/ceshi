import React from 'react';
import {Spinner, Modal} from "react-bootstrap";

export default function Loading(props){

    const {showLoading,tips} = props;
    return <Modal
        show={showLoading}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => {}}
    >
        <Modal.Body className='loading'>
            <div className="spinner">
                <Spinner animation="border" variant="primary" />
            </div>
             <h4 className="waiting">{tips}</h4>
        </Modal.Body>
    </Modal>;

}

