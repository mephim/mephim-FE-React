import { useNavigate } from 'react-router-dom';
import './style.css';
import { signInRequest } from '../../apis/auth.api';
import { useState } from 'react';
import { toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleClickLogin = async (e: any) => {
        e.preventDefault();
        signInRequest(username, password)
            .then((res) => {
                window.localStorage.setItem('access_token', res.data.data.token);
                window.localStorage.setItem('refresh_token', res.data.data.refreshToken);
                navigate('/');
            })
            .catch((e) => {
                toast.error('🦄 Tài khoản không đúng!', {
                    position: 'top-right',
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            });
    };

    return (
        <div className='form-wrapper'>
            <div className='register-form'>
                <h2>Mephim</h2>
                <form action='#'>
                    <div className='input-box'>
                        <input
                            type='text'
                            placeholder='Nhập email'
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className='input-box'>
                        <input
                            type='password'
                            placeholder='Nhập mật khẩu'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='input-box button' onClick={(e) => handleClickLogin(e)}>
                        <input type='Submit' defaultValue='Đăng nhập' />
                    </div>
                    <div className='text'>
                        <h3>
                            Nếu bạn chưa có tài khoản?{' '}
                            <a
                                href='#'
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/register');
                                }}
                            >
                                Đăng ký
                            </a>
                        </h3>
                        <h3>
                            <a
                                href='#'
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/requestCode');
                                }}
                            >
                                Quên mật khẩu?
                            </a>
                        </h3>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
