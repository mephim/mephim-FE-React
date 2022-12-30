import mascot from '../../assets/images/mascot.png'
import {useNavigate} from "react-router-dom";
import './style.css';
import * as Api from "../../api";
import {signIn} from "../../apis/auth.api";
import {useState} from "react";
import {useCookies} from "react-cookie";

function Login () {
    const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token']);
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleClickLogin = async () => {
        signIn(username, password).then(res => {
            setCookie('access_token',res.data.data.token);
            setCookie('refresh_token',res.data.data.refreshToken);

            console.log('r3232r23r');
            console.log(res.data.data);
            console.log('cookie: ', cookies['access_token']);
        })
    };

    return <div className="main">
        <div className="row h-100">
            <div className="col col-5 left">
                <form action="#">
                    <h3 className="form-header text-center">Đăng ký</h3>
                    <div className="row">
                        <div className="col col-6 mb-3">
                            <label htmlFor="input1" className="d-block mb-2">
                                Email
                            </label>
                            <input type="text" id="input1" />
                        </div>
                        <div className="col col-6 mb-3">
                            <label htmlFor="input2" className="d-block mb-2">
                                Tên đăng nhập
                            </label>
                            <input type="text" id="input2" onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="col col-6 mb-3">
                            <label htmlFor="input3" className="d-block mb-2">
                                Mật khẩu
                            </label>
                            <input type="text" id="input3" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col col-12">
                            <button className="register-btn btn btn-dark w-100" type="submit">
                                Tạo tài khoản
                            </button>
                            <div className="text-center my-3">
                                <span className="">hoặc</span>
                            </div>
                            <button className="facebook-login-btn btn btn-primary w-100" onClick={(e) => {
                                e.preventDefault();
                                handleClickLogin();
                            }}>
                                Đăng nhập bằng Facebook
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col col-7 right d-flex align-items-center justify-content-center">
                <img className="d-block" src={mascot} alt="" />
            </div>
        </div>
    </div>
}

export default Login;
