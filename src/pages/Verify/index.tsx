import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verify } from '../../apis/auth.api';

function Verify() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const verifyCode = params.get('code') || '';
    const [resultMsg, setResultMsg] = useState<ReactNode>(<>Loading...</>);

    useEffect(() => {
        verify(verifyCode).then(() => {
            setResultMsg(<i>Xác thực tài khoản thành công đăng nhập <u><a onClick={() => navigate('/login')}>Tại đây</a></u></i>);
        }).catch(
            () => navigate('/404'),
        );
    }, []);

    return <>{resultMsg}</>;
}

export default Verify;
