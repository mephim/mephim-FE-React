import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Constants from '../../shared/constants';
import { requestCodeRequest } from '../../apis/auth.api';

function RequestVerifyCode() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');

    const requestVerifyCode = async (e: any) => {
        e.preventDefault();
        requestCodeRequest(email).then(() => {
            toast.success('🦄 Gữi mã thành công vui lòng kiểm tra email!', Constants.TOAST_OPTION_DEFAULT);
            navigate('/login');
        }).catch(() => {
            toast.error('🦄 Tài khoản không tồn tại!', Constants.TOAST_OPTION_DEFAULT);
        });
    };

    return (
        <div className="form-wrapper">
            <div className="register-form">
                <h2>Mephim</h2>
                <form action="#">
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Nhập email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-box button" onClick={(e) => requestVerifyCode(e)}>
                        <input type="Submit" defaultValue="Gữi mã xác nhận" />
                    </div>
                    <div className="text">
                        <h3>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/login');
                                }}
                            >
                                Đăng nhập
                            </a>
                        </h3>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RequestVerifyCode;
