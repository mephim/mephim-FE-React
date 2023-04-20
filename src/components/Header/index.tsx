import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from '../../shared/common';
import './style.css';
import { MutableRefObject, useContext, useRef } from 'react';
import Context from '../../context/context';

function Header() {
    const context = useContext(Context);
    const navigate = useNavigate();
    const currentUser = parseJwt(window.localStorage.getItem('access_token') + '')?.sub || null;
    const availablePoint = window.localStorage.getItem('available_point') || 0;
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

    const logout = () => {
        window.localStorage.clear();
        navigate('/');
    };

    const setKeySearch = () => {
        console.log('KeyL : ', inputRef.current.value);
        context.setKeySearch(inputRef.current.value);
        navigate('/showing');
    };

    return <section className='banner'>
        <div className='logo-wrapper'>
            <span onClick={() => navigate('/')} className='logo-wrapper'>
                <img src={logo} alt='' />
            </span>
        </div>
        <div className='menubar-wrapper d-flex align-items-center justify-content-around'>
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
        <div className='d-flex align-items-center justify-content-around'>
            <input className='form-control' type='text' ref={inputRef} />
            <button className='btn btn-secondary ml-10 find-btn' onClick={() => setKeySearch()}>Tìm kiếm</button>
        </div>

        {currentUser && <div className='user-login'>
            <span className='available-point d-inline-block mr-10'>{availablePoint}
                <svg width='24' height='24' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path
                    d='M4 4.5A2.5 2.5 0 0 1 6.5 2H18a2.5 2.5 0 0 1 2.5 2.5v14.25a.75.75 0 0 1-.75.75H5.5a1 1 0 0 0 1 1h13.25a.75.75 0 0 1 0 1.5H6.5A2.5 2.5 0 0 1 4 19.5v-15Zm6.197 2.964C9.622 7.739 9 8.24 9 9s.622 1.26 1.197 1.536c.622.297 1.437.464 2.303.464.866 0 1.681-.167 2.303-.464C15.378 10.261 16 9.76 16 9s-.621-1.26-1.197-1.536C14.18 7.167 13.366 7 12.5 7c-.866 0-1.681.167-2.303.464Zm5.798 3.426C15.17 11.567 13.91 12 12.5 12c-1.41 0-2.67-.433-3.495-1.11A1.163 1.163 0 0 0 9 11c0 1.105 1.567 2 3.5 2s3.5-.895 3.5-2c0-.037-.002-.073-.005-.11ZM12.5 14c-1.41 0-2.67-.433-3.495-1.11A1.166 1.166 0 0 0 9 13c0 1.105 1.567 2 3.5 2s3.5-.895 3.5-2a1.15 1.15 0 0 0-.005-.11C15.17 13.567 13.91 14 12.5 14Z'
                    fill='#F39C19' /></svg></span>
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
