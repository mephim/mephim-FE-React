import './style.css';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../apis/auth.api';
import { toast, ToastOptions } from 'react-toastify';
import { useState } from 'react';
import Constants from '../../shared/constants';

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleRegister = async (e: any) => {
        e.preventDefault();

        if (password !== rePassword) {
            toast.error('🦄 Mật khẩu không khớp!',  Constants.TOAST_OPTION_DEFAULT);
            return;
        }
        signUp(username, password, email)
            .then((res) => {
                if(res.data.code === Constants.ERROR_CODE.DUPLICATE_EMAIL) {
                    toast.error('🦄 Email đã tồn tại!',  Constants.TOAST_OPTION_DEFAULT);
                } else if(res.data.code === Constants.ERROR_CODE.DUPLICATE_USERNAME) {
                    toast.error('🦄 Tên đăng nhập đã tồn tại!',  Constants.TOAST_OPTION_DEFAULT);
                } else {
                    toast.success('🦄 Đăng ký thành công, vui lòng kiểm tra email!',  Constants.TOAST_OPTION_DEFAULT);
                    navigate('/login');
                }
            })
            .catch((e) => {
                console.log(e);
                toast.error('🦄 Thông tin không hợp lệ!');
            });
    };

    return (
        <div className="register-form">
            <h2>Mephim</h2>
            <form action="#">
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Nhập tên đăng nhập"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <input type="text" placeholder="Nhập email" onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        onChange={(e) => setRePassword(e.target.value)}
                        required
                    />
                </div>
                <div className="policy">
                    <input type="checkbox" />
                    <h3>Tôi đồng ý với các điều khoản và điều kiện</h3>
                </div>
                <div className="input-box button">
                    <input type="Submit" defaultValue="Đăng ký" onClick={(e) => handleRegister(e)} />
                </div>
                <div className="text">
                    <h3>
                        Nếu bạn có tài khoản?{' '}
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/login');
                            }}
                        >
                            Đăng nhập ngay
                        </a>
                    </h3>
                </div>
            </form>
        </div>
    );
}

export default Register;
