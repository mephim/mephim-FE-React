import { useNavigate } from 'react-router-dom';
import { signIn } from '../../apis/auth.api';
import { useState } from 'react';
import { toast } from 'react-toastify';

function ResetPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');

    const requestVerifyCode = async (e: any) => {
        e.preventDefault();
    };

    return (
        <div className='form-wrapper'>
            <div className='register-form'>
                <h2>Mephim</h2>
                <form action='#'>
                    <div className='input-box'>
                        <input
                            type='text'
                            placeholder='Nhập mật khẩu mới'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='input-box'>
                        <input
                            type='text'
                            placeholder='Nhập lại mật khẩu'
                            onChange={(e) => setRePassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='input-box button' onClick={(e) => requestVerifyCode(e)}>
                        <input type='Submit' defaultValue='Xác nhận' />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
