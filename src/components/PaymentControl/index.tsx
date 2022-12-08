import "./style.css";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Select } from "antd";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";

function PaymentControl() {
  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };
  // Random component
  const Completionist = () => <span>You are good to go!</span>;

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <div className="payment-control">
      <Row>
        <Col xs={12}>
          <h4 className="text-center center mt-32 heading">
            PHƯƠNG THỨC THANH TOÁN
          </h4>

          <Select
            labelInValue
            defaultValue={{ value: "lucy", label: "Lucy (101)" }}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              {
                value: "jack",
                label: "Jack (100)",
              },
              {
                value: "lucy",
                label: "Lucy (101)",
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
}

export default PaymentControl;
