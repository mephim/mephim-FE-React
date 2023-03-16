import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './style.css';
import Table from 'react-bootstrap/Table';
import { findTransByMail } from '../../apis/transaction.api';
import { ITransaction } from '../../shared/model/ITransaction';

function UserInformation() {

    const [listTrans, setListTrans] = useState<ITransaction[]>([]);

    useEffect(() => {
        findTransByMail({ mail: 'lchau3@yopmail.com' }).then((res) => {
            setListTrans(res.data.data);
        }).catch();
    }, []);

    return (
        <div className='user-info'>
            <Container>
                <Row>
                    <Col sx={6}>
                        <div className="mt-20">
                            <h3>Thông tin cá nhân</h3>
                            <div>
                                <div>
                                    <Row>
                                        <Col xs={4}>
                                            <span>Tên: </span>
                                        </Col>
                                        <Col xs={8}>
                                            <input className='form-input' type="text" />
                                        </Col>
                                    </Row>
                                </div>
                                <div className='mt-10'>
                                    <Row>
                                        <Col xs={4}>
                                            <span>Email: </span>
                                        </Col>
                                        <Col xs={8}>
                                            <input disabled className='form-input' type="text" />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>

                        <div className="mt-20">
                            <h3>Đổi mật khẩu</h3>
                            <div>
                                <div>
                                    <Row>
                                        <Col xs={4}>
                                            <span>Mật khẩu cũ: </span>
                                        </Col>
                                        <Col xs={8}>
                                            <input className='form-input' type="password" />
                                        </Col>
                                    </Row>
                                </div>
                                <div className='mt-10'>
                                    <Row>
                                        <Col xs={4}>
                                            <span>Mật khẩu mới: </span>
                                        </Col>
                                        <Col xs={8}>
                                            <input className='form-input' type="password" />
                                        </Col>
                                    </Row>
                                </div>
                                <div className='mt-10 center'>
                                    <button className='btn btn-primary'>Đổi mật khẩu</button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sx={6}>
                        <div className="mt-20">
                            <h3>Lịch sữ giao dịch</h3>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Thời gian</th>
                                        <th>Tên phim</th>
                                        <th>Ghế</th>
                                        <th>Giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listTrans.map((item: ITransaction, index) => (
                                        <tr>
                                            <td>{index}</td>
                                            <td>{item.time}</td>
                                            <td>{item.movieName}</td>
                                            <td>{item.seat}</td>
                                            <td>{item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default UserInformation;
