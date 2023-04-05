import './style.css';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Form, Input, Select } from 'antd';
import Countdown from 'react-countdown';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPaymentRequest } from '../../apis/payment.api';
import { parseJwt } from '../../shared/common';
import { toast } from 'react-toastify';
import { addBookingRequest } from '../../apis/booking.api';

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
    const ticket = state.response.ticket;
    const totalPrice = state.response.totalPrice;
    const listSeatString = state.response.seat.map((seat: any) => seat.seatId).join('_');
    console.log('listSeatString: ', listSeatString);
    const movie = state.response.movie;
    const showDate = state.response.showDate;
    const showTime = state.response.showTime;
    const seatString = state.response.seat.map((seat: any) => seat.seatName).join(', ');
    const currentUser = parseJwt(window.localStorage.getItem('access_token') + '')?.sub || null;
    const [paymentMethod, setPaymentMethod] = useState<string>("VNPAY");
    const availablePoint = window.localStorage.getItem('available_point') || 0;

    useEffect(() => {
        if (currentUser === null) {
            navigate('/login');
            toast.info('🦄 Đăng nhập để đặt vé!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    });

    const handleChange = (value: { value: string; label: React.ReactNode }) => {
        console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
        setPaymentMethod(value.value);
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
        if(paymentMethod === 'rewardPoint') {
            addBookingRequest(currentUser, listSeatString.split('_').map(Number), Number(ticket.ticketId), Number(ticket.ticketPrice)).then(res => {
                console.log('Add booking successful: ', res);
            }).catch(err => console.log(err));

            return;
        }
        createPaymentRequest(amount, movie.movieId + '__' + currentUser + '__' + listSeatString + '__' + ticket.ticketId).then(res => window.location = res.data)
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
                            {
                                value: 'rewardPoint',
                                label: 'Điểm tích lũy',
                            },
                        ]}
                    />

                    <div className="mt-12">
                        <h5>Thông tin người mua</h5>

                        <div className="mt-12">
                            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" disabled={true}>

                                <Form.Item label="Email">
                                    <Input value={currentUser} />
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
                                    <Input value={totalPrice} />
                                </Form.Item>
                            </Form>
                        </div>
                        <div className='center'>
                        {paymentMethod==='rewardPoint' && availablePoint < totalPrice && <span className='text-danger'>Số dư không đủ</span>}
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <div className="center mt-32">
                        <button className="nextBtn" disabled={paymentMethod==='rewardPoint' && availablePoint < totalPrice} onClick={() => redirectToPaymentPage(totalPrice, movie)}>
                            Thanh toán
                        </button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default PaymentControl;
