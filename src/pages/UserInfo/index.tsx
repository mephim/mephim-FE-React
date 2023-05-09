import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form, Input, Select, Spin } from 'antd';
import './style.css';
import Table from 'react-bootstrap/Table';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { findTransByMail } from '../../apis/transaction.api';
import { ITransaction } from '../../shared/model/ITransaction';
import { parseJwt } from '../../shared/common';
import IUserResponse from '../../shared/model/response/IUserResponse';
import { updateInfoRequest, userDetail } from '../../apis/user.api';
import { toast } from 'react-toastify';

interface IFormUpdate {
    name: string;
    phone: string;
}

interface IFormChangePassword {
    password: string;
    rePassword: string;
}

function UserInformation() {
    const currentUser = parseJwt(window.localStorage.getItem('access_token') + '')?.sub || null;
    const [getUser, setGetUser] = useState<IUserResponse>();
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    console.log('GET USER', getUser);
    const nameInput = useRef<HTMLInputElement>(null);
    const phoneInput = useRef<HTMLInputElement>(null);

    const [listTrans, setListTrans] = useState<ITransaction[]>([]);

    useEffect(() => {
        findTransByMail({ mail: currentUser })
            .then((res) => {
                setListTrans(res.data.data);
            })
            .catch();

        userDetail(currentUser).then((res: any) => {
            console.log('Get user: ', res.data.data);
            setGetUser(res.data.data);
            setName(res.data.data.name);
            setPhone(res.data.data.phone);
            console.log(nameInput?.current?.value);
        });
    }, []);

    const validationSchema1 = Yup.object().shape({
        name: Yup.string().required('Trường này là bắt buộc'),
        phone: Yup.string().required('Trường này là bắt buộc'),
    });

    const validationSchema2 = Yup.object().shape({
        password: Yup.string().required('Trường này là bắt buộc'),
        rePassword: Yup.string()
            .required('Trường này là bắt buộc')
            .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
    });

    const onUpdate = async (data: IFormUpdate) => {
        updateInfoRequest(data.name, data.phone, currentUser)
            .then((res) => {
                console.log(res.data.data);
                toast.success('Cập nhật thành công');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Cập nhật thất bại');
            });
    };

    const onResetPass = async (data: any) => {};

    const {
        handleSubmit: handleUpdate,
        control: userControl,
        formState: { errors },
    } = useForm<IFormUpdate>({
        resolver: yupResolver(validationSchema1),
    });

    const {
        handleSubmit: handleResetPass,
        control: resetPassControl,
        formState: { errors: errorsForm2 },
    } = useForm<IFormChangePassword>({
        resolver: yupResolver(validationSchema2),
    });

    return (
        <div className="user-info">
            <Container>
                <Row>
                    <Col sx={6}>
                        <div className="mt-20">
                            <h3>Thông tin cá nhân</h3>
                            <Form
                                labelCol={{ span: 2 }}
                                // wrapperCol={{ span: 10 }}
                                layout="horizontal"
                                onValuesChange={() => {}}
                                onFinish={handleUpdate(onUpdate)}
                            >
                                <div>
                                    <div>
                                        <Row>
                                            <Col xs={4}>
                                                <span>Tên: </span>
                                            </Col>
                                            <Col xs={8}>
                                                <Controller
                                                    control={userControl}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            defaultValue={name}
                                                            className="form-input"
                                                            type="text"
                                                        />
                                                    )}
                                                />
                                                <span className="d-block text-danger">{errors.name?.message}</span>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="mt-10">
                                        <Row>
                                            <Col xs={4}>
                                                <span>Số điện thoại: </span>
                                            </Col>
                                            <Col xs={8}>
                                                <Controller
                                                    control={userControl}
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            defaultValue={phone}
                                                            className="form-input"
                                                            type="text"
                                                        />
                                                    )}
                                                />
                                                <span className="d-block text-danger">{errors.phone?.message}</span>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="mt-10">
                                        <Row>
                                            <Col xs={4}>
                                                <span>Email: </span>
                                            </Col>
                                            <Col xs={8}>
                                                <input
                                                    disabled
                                                    defaultValue={currentUser}
                                                    className="form-input"
                                                    type="text"
                                                />
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="mt-10 center">
                                        <button className="btn btn-primary">Cập nhật</button>
                                    </div>
                                </div>
                            </Form>
                        </div>

                        <div className="mt-20">
                            <h3>Đổi mật khẩu</h3>
                            <Form
                                labelCol={{ span: 2 }}
                                // wrapperCol={{ span: 10 }}
                                layout="horizontal"
                                onValuesChange={() => {}}
                                onFinish={handleResetPass(onResetPass)}
                            >
                                <div>
                                    <div>
                                        <Row>
                                            <Col xs={4}>
                                                <span>Mật khẩu cũ: </span>
                                            </Col>
                                            <Col xs={8}>
                                                <Controller
                                                    control={resetPassControl}
                                                    name="password"
                                                    render={({ field }) => (
                                                        <input {...field} className="form-input" type="password" />
                                                    )}
                                                />
                                                <span className="d-block text-danger">
                                                    {errorsForm2.password?.message}
                                                </span>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="mt-10">
                                        <Row>
                                            <Col xs={4}>
                                                <span>Mật khẩu mới: </span>
                                            </Col>
                                            <Col xs={8}>
                                                <Controller
                                                    control={resetPassControl}
                                                    name="rePassword"
                                                    render={({ field }) => (
                                                        <input {...field} className="form-input" type="password" />
                                                    )}
                                                />
                                                <span className="d-block text-danger">
                                                    {errorsForm2.rePassword?.message}
                                                </span>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="mt-10 center">
                                        <button className="btn btn-primary">Đổi mật khẩu</button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </Col>
                    <Col sx={6}>
                        <div className="mt-20">
                            <h3>Lịch sử giao dịch</h3>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Thời gian</th>
                                        <th>Tên phim</th>
                                        <th>Ghế</th>
                                        <th>Giá</th>
                                        <th>Điểm sữ dụng</th>
                                        <th>Điểm tích lỹ</th>
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
                                            <td>{item.pointOfUse || 0}</td>
                                            <td>{Math.floor((Number(item.price) * 10) / 100)}</td>
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
