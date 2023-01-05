import './style.css';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Form, Input, Select } from 'antd';
import Countdown from 'react-countdown';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Api from '../../api';
import { createPayment } from '../../apis/payment.api';

interface PaymentState {
    state: {
        response: any;
    };
}

function PaymentControl() {
    const navigate = useNavigate();
    const location = useLocation();

    const { state } = location as PaymentState;
    console.log('state: ', state);
    const ticketPrice = state.response.price;
    const email = state.response.email;
    const phone = state.response.phone;
    const name = state.response.name;
    const movie = state.response.movie;
    const showDate = state.response.showDate;
    const showTime = state.response.showTime;
    const seatString = state.response.seat.map((seat: any) => seat.seatName).join(', ');

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
                <span className="fs-2">
                    {minutes}:{seconds}
                </span>
            );
        }
    };

    const redirectToPaymentPage = async (amount: number, movie: any) => {
        createPayment(amount,movie.movieName).then(res => window.location = res.data)
    };

    return (
        <div className="payment-control">
            <Row className="center">
                <Col xs={6}>
                    <h4 className="text-center center mt-32 heading">PHƯƠNG THỨC THANH TOÁN</h4>

                    <div className="center">
                        <Countdown
                            // count down 5 minute
                            date={Date.now() + 5 * 60 * 1000}
                            renderer={renderer}
                        />
                    </div>

                    <div>
                        <div className="choose-payment-method">
                            <h5>Phương thức thanh toán</h5>
                        </div>
                    </div>

                    <Select
                        labelInValue
                        defaultValue={{
                            value: 'VNPay',
                            label: 'VNPay',
                        }}
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 'VNPay',
                                label: 'VNPay',
                            },
                        ]}
                    />

                    <div className="mt-12">
                        <h5>Thông tin người mua</h5>

                        <div className="mt-12">
                            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" disabled={true}>
                                <Form.Item label="Người nhận">
                                    <Input value={name} />
                                </Form.Item>

                                <Form.Item label="Email">
                                    <Input value={email} />
                                </Form.Item>

                                <Form.Item label="Số điện thoại">
                                    <Input value={phone} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>

                    <div className="mt-12">
                        <h5>Thông tin vé</h5>

                        <div className="mt-12">
                            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" disabled={true}>
                                <Form.Item label="Rạp">
                                    <Input value="Metiz" />
                                </Form.Item>

                                <Form.Item label="Phim">
                                    <Input value={movie.movieName} />
                                </Form.Item>

                                <Form.Item label="Suất chiếu">
                                    <Input value={showDate.date + ' ' + showTime.time} />
                                </Form.Item>

                                <Form.Item label="Vé">
                                    <Input value={seatString} />
                                </Form.Item>

                                <Form.Item label="Tổng tiền">
                                    <Input value={ticketPrice} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <div className="center mt-32">
                        <button className="nextBtn" onClick={() => redirectToPaymentPage(ticketPrice, movie)}>
                            Thanh toán
                        </button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default PaymentControl;
