import "./style.css";
import logo from "../../assets/images/logo.png";
import slide1 from "../../assets/images/slide1.jpg";
import slide2 from "../../assets/images/slide2.jpg";
import slide3 from "../../assets/images/slide3.jpg";
import CustomCarousel from "../../components/CustomCarousel";
import { Button } from "react-bootstrap";

function Home() {
  const listImageSrc: string[] = [slide1, slide2, slide3];
  return (
    <div className="home">
      <section className="banner">
        <div className="logo-wrapper">
          <a href="#" className="logo-wrapper">
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="menubar-wrapper">
          <ul>
            <li>
              <a href="">LỊCH CHIẾU</a>
            </li>
            <li>
              <a href="">PHIM</a>
            </li>
            <li>
              <a href="">KHUYẾN MÃI</a>
            </li>
            <li>
              <a href="">THÀNH VIÊN</a>
            </li>
            <li>
              <a href="">BLOG PHIM</a>
            </li>
          </ul>
        </div>
        <div className="user-login">
          <a href="#">ĐĂNG NHẬP</a>
          <span>/</span>
          <a href="#">ĐĂNG KÝ</a>
        </div>
      </section>
      <section className="slide-section">
        <CustomCarousel imagesSrc={listImageSrc} duration={5000} />
      </section>
      <section className="movie-section">
        <div className="choose-btn">
          <button className="tab active">
            <span>PHIM ĐANG CHIẾU</span>
          </button>
          <button className="tab">
            <span>PHIM SẮP CHIẾU</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
