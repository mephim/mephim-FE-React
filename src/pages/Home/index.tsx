import "./style.css";
import logo from "../../assets/images/logo.png";

function Home() {
  return (
    <div className="home">
      <div className="banner">
        <div className="logo-wrapper">
          <img src={logo} alt="" />
        </div>
        <div className="menubar-wrapper">
          <ul>
            <li>
              <a href="">TRANG CHỦ</a>
            </li>
            <li>
              <a href="">LỊCH CHIẾU</a>
            </li>
            <li>
              <a href="">KHUYẾN MÃI</a>
            </li>
            <li>
              <a href="">ĐẶT VÉ</a>
            </li>
            <li>
              <a href="">TUYỂN DỤNG</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
