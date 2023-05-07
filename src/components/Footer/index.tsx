import './style.css'
function Footer() {
    return <div className='footer'>
        <div className='social'>
            <a href='' className='social__ fb'><i className='fa-brands fa-facebook'></i></a>
            <a href='' className='social__ ins'><i className='fa-brands fa-instagram'></i></a>
            <a href='' className='social__ ytb'><i className='fa-brands fa-youtube'></i></a>
        </div>
        <footer>
            <div className='footer__first'>
                <div className='footer__first-1'>
                    <div className='img'><img src='https://metiz.vn/static//assets/websites/images/logo_footer.png'
                                              alt='' /></div>
                    <p>TẦNG 1 HELIO CENTER,<br />
                        ĐƯỜNG 2/9, HẢI CHÂU,
                        ĐÀ NẴNG</p>
                    <a className='maps'><i className='fa-solid fa-map-location-dot'></i> Xem bản đồ</a>
                </div>
                <div className='footer__first-2'>
                    <h4>METIZ CINEMA</h4>
                    <ul>
                        <li><a href=''>Giới Thiệu</a></li>
                        <li><a href=''>Tuyển dụng</a></li>
                        <li><a href=''>Liên hệ</a></li>
                    </ul>
                </div>
                <div className='footer__first-3'>
                    <h4>THÔNG TIN CHUNG</h4>
                    <ul>
                        <li><a href=''>Điều Khoản chung</a></li>
                        <li><a href=''>Câu hỏi thường gặp</a></li>
                        <li><a href=''>Liên hệ</a></li>
                    </ul>
                </div>
                <div className='footer__first-4'>
                    <h4>THEO DÕI CHÚNG TÔI</h4>
                    <img src='Screenshot 2023-05-07 120442.png' alt='' />
                </div>
            </div>
            <div className='footer__center'>
                <div className='infor'>
                    <p>Tên Doanh Nghiệp:Danh sách phòng chiếu Công Ty TNHH KHỞI PHÁT. <br />
                        Giấy CNĐKKD: 0400668112 - Ngày cấp: 05/11/2008. Đăng ký thay đổi lần thứ 11 ngày 21/12/2016 <br />
                        Cơ quan cấp: Phòng Đăng ký kinh doanh - Sở kế hoạch và đầu tư Thành phố Đà Nẵng <br />
                        Địa chỉ đăng ký kinh doanh: 22 đường 2/9, Phường Bình Hiên, Q.Hải Châu, Tp.Đà Nẵng, Việt
                        Nam. <br />
                        Điện thoại: 0236 3630 689</p>
                </div>
                <div className='chungnhan'>
                    <img src='https://metiz.vn/static//assets/websites/images/icon-notify.png' alt='' />
                </div>
            </div>
            <hr />
                <div className='footer__end'>
                    <div className='z'><h4>MỘT SẢN PHẨM ĐẾN TỪ KHỞI PHÁT, LTD.</h4></div>
                    <div className='zz'>
                        <img src='https://metiz.vn/static//assets/websites/images/logo_bottom.png' alt='' />
                    </div>
                    <div className='zzz'><h4>BẢN QUYỀN © 2017 METIZ CINEMA</h4></div>
                </div>
        </footer>
    </div>;
}

export default Footer;
