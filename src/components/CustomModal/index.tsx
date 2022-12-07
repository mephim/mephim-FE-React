import Modal from 'react-bootstrap/Modal';
import {ReactNode} from "react";

interface IPropModal {
    show: boolean;
    onHide: () => void;
    heading: String;
    content: ReactNode;
}

function MyModal({show, onHide, heading, content}: IPropModal) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="myModal"
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3 className="text-start text-orange p-0 m-0">{heading}</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {content}
            </Modal.Body>
        </Modal>
    );
}

export default MyModal;
