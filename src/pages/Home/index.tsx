import "./style.css";
import logo from "../../assets/images/logo.png";
import slide1 from "../../assets/images/slide1.jpg";
import slide2 from "../../assets/images/slide2.jpg";
import slide3 from "../../assets/images/slide3.jpg";
import CustomCarousel from "../../components/CustomCarousel";
import CustomSlider from "../../components/CustomSlickSlide";
import { IMovieCard } from "../../model/IMovieCard";
import {useEffect} from "react";
import * as Api from '../../api/index'

function Home() {
  const listImageSrc: string[] = [slide1, slide2, slide3];
  const listMovieCard: IMovieCard[] = [
    {
      image: "https://metiz.vn/media/poster_film/470x700.jpg",
      name: "GIAI ĐIỆU NÀO ANH CŨNG BIẾT TUỐT11111111111111111111111111111",
      length: 120,
      room: "C18",
      date: "04-11-2022",
    },
    {
      image:
        "https://metiz.vn/media/poster_film/teaser_poster_1-other_child.jpg",
      name: "THẾ NHÂN",
      length: 115,
      room: "C14",
      date: "04-11-2022",
    },
    {
      image: "https://metiz.vn/media/poster_film/black.jpg",
      name: "CHIẾN BINH BÁO ĐEN",
      length: 120,
      room: "C18",
      date: "04-11-2022",
    },
    {
      image: "https://metiz.vn/media/poster_film/poster_1080x1350.jpg",
      name: "YÊU KHÔNG SỢ HÃI",
      length: 120,
      room: "C18",
      date: "04-11-2022",
    },
    {
      image:
        "https://metiz.vn/media/poster_film/kclttg_-_main_poster_web__1.jpg",
      name: "KHỈ CON LON TON THẾ GIỚI",
      length: 120,
      room: "C18",
      date: "04-11-2022",
    },
  ];

  const fetchData = async () => {
    const response = await Api.get('/api/movie/listMovie');
    console.log(response);
  };

  useEffect(()=> {
    fetchData();
  }, []);

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
        <div className="movie-slider">
          <CustomSlider children={listMovieCard} />
        </div>
      </section>
    </div>
  );
}

export default Home;
