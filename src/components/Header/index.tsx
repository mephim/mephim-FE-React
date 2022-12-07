import logo from "../../assets/images/logo.png";

function Header() {
 return <section className="banner">
     <div className="logo-wrapper">
         <a href="#" className="logo-wrapper">
             <img src={logo} alt="" />
         </a>
     </div>
     <div className="menubar-wrapper">
         <ul>
             <li>
                 <span>LỊCH CHIẾU</span>
             </li>
             <li>
                 <span>PHIM</span>
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
     <div className="user-login">
         <span>ĐĂNG NHẬP</span>
         <span>/</span>
         <span>ĐĂNG KÝ</span>
     </div>
 </section>
}

export default Header;
