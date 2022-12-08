import './style.css';
import React from "react";
import {Col, Row} from "react-bootstrap";
import { Select } from 'antd';

function PaymentControl() {
    return <div className="payment-control">
        <Row>
            <Col xs={12}>
                <h4 className="text-center center mt-32 heading">PHƯƠNG THỨC THANH TOÁN</h4>
            </Col>
        </Row>
    </div>;
}

export default PaymentControl;
