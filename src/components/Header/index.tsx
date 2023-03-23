import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from '../../shared/common';

function Header() {
    const navigate = useNavigate();
    const currentUser = parseJwt(window.localStorage.getItem('access_token') + '')?.sub || null;

    const logout = () => {
        window.localStorage.clear();
        navigate('/');
    };
    return <section className='banner'>
        <div className='logo-wrapper'>
         <span onClick={() => navigate('/')} className='logo-wrapper'>
             <img src={logo} alt='' />
         </span>
        </div>
        <div className='menubar-wrapper'>
            <ul>
                <li>
                    <span onClick={() => navigate('/showing')}>PHIM</span>
                </li>
                <li>
                    <span>KHUYẾN MÃI</span>
                </li>
                <li>
                    <span>THÀNH VIÊN</span>
                </li>
                <li>
                    <span>BLOG PHIM</span>
                </li>
            </ul>
        </div>

        {currentUser && <div className='user-login'>
            <span className='text-light' onClick={() => navigate('/my-info')}>{currentUser}</span>
            <span className='text-light'>   /   </span>
            <span className='text-light' onClick={() => logout()}>ĐĂNG XUẤT</span>
        </div>
        }

        {!currentUser && <div className='user-login'>
            <span className='text-light' onClick={() => navigate('/login')}>ĐĂNG NHẬP</span>
            <span className='text-light'>   /   </span>
            <span className='text-light' onClick={() => navigate('/register')}>ĐĂNG KÝ</span>
        </div>}
    </section>;
}

export default Header;
