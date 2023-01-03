import './style.css';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../apis/auth.api';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import Constants from '../../shared/constants';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';


interface IFormInputs {
    username: string;
    email: string;
    password: string;
    rePassword: string;
}

function Register() {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Trường này là bắt buộc'),
        email: Yup.string()
            .required('Trường này là bắt buộc'),
        password: Yup.string()
            .required('Trường này là bắt buộc'),
        rePassword: Yup.string()
            .required('Trường này là bắt buộc'),
    });
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: any) => {
        const { username, email, password, rePassword } = data;
        console.log('--username; ', username);
        if (password !== rePassword) {
            toast.error('🦄 Mật khẩu không khớp!', Constants.TOAST_OPTION_DEFAULT);
            return;
        }
        signUp(username, password, email)
            .then((res) => {
                if (res.data.code === Constants.ERROR_CODE.DUPLICATE_EMAIL) {
                    toast.error('🦄 Email đã tồn tại!', Constants.TOAST_OPTION_DEFAULT);
                } else if (res.data.code === Constants.ERROR_CODE.DUPLICATE_USERNAME) {
                    toast.error('🦄 Tên đăng nhập đã tồn tại!', Constants.TOAST_OPTION_DEFAULT);
                } else {
                    toast.success('🦄 Đăng ký thành công, vui lòng kiểm tra email!', Constants.TOAST_OPTION_DEFAULT);
                    navigate('/login');
                }
            })
            .catch((e) => {
                console.log(e);
                toast.error('🦄 Thông tin không hợp lệ!');
            });
    };

    return (
        <div className='form-wrapper'>
            <div className='register-form'>
                <h2>Mephim</h2>
                <Form noValidate
                      onSubmit={handleSubmit(onSubmit)}>
                    <div className='input-box'>
                        <Controller
                            control={control}
                            name='username'
                            defaultValue=''
                            render={({ field: { onChange, value, ref } }) => (
                                <Form.Control
                                    className='username'
                                    onChange={onChange}
                                    value={value}
                                    ref={ref}
                                    isInvalid={!!errors.username}
                                    placeholder='Nhập tên đăng nhậ1p'
                                />
                            )}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.username?.message}
                        </Form.Control.Feedback>
                    </div>
                    <div className='input-box'>
                        <Controller
                            control={control}
                            name='email'
                            defaultValue=''
                            render={({ field: { onChange, value, ref } }) => (
                                <Form.Control
                                    className='password'
                                    onChange={onChange}
                                    value={value}
                                    ref={ref}
                                    isInvalid={!!errors.email}
                                    placeholder='Nhập email'
                                />
                            )}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.email?.message}
                        </Form.Control.Feedback>
                    </div>
                    <div className='input-box'>
                        <Controller
                            control={control}
                            name='password'
                            defaultValue=''
                            render={({ field: { onChange, value, ref } }) => (
                                <Form.Control
                                    className='password'
                                    type='password'
                                    onChange={onChange}
                                    value={value}
                                    ref={ref}
                                    isInvalid={!!errors.password}
                                    placeholder='Nhập mật khẩu'
                                />
                            )}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.password?.message}
                        </Form.Control.Feedback>
                    </div>
                    <div className='input-box'>
                        <Controller
                            control={control}
                            name='rePassword'
                            defaultValue=''
                            render={({ field: { onChange, value, ref } }) => (
                                <Form.Control
                                    className='password'
                                    type='password'
                                    onChange={onChange}
                                    value={value}
                                    ref={ref}
                                    isInvalid={!!errors.rePassword}
                                    placeholder='Nhập lại mật khẩu'
                                />
                            )}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.rePassword?.message}
                        </Form.Control.Feedback>
                    </div>
                    <div className='policy'>
                        <input type='checkbox' />
                        <h3>Tôi đồng ý với các điều khoản và điều kiện</h3>
                    </div>
                    <div className='input-box button'>
                        <input type='Submit' defaultValue='Đăng ký' />
                    </div>
                    <div className='text'>
                        <h3>
                            Nếu bạn có tài khoản?{' '}
                            <a
                                href='#'
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/login');
                                }}
                            >
                                Đăng nhập ngay
                            </a>
                        </h3>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Register;
