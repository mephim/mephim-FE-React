import "./style.css";
import logo from "../../assets/images/logo.png";
import slide1 from "../../assets/images/slide1.jpg";
import slide2 from "../../assets/images/slide2.jpg";
import slide3 from "../../assets/images/slide3.jpg";
import CustomCarousel from "../../components/CustomCarousel";
import CustomSlider from "../../components/CustomSlickSlide";
import { IMovie } from "../../model/IMovie";
import {useEffect, useState} from "react";
import * as Api from '../../api/index'

function Home() {
  const listImageSrc: string[] = [slide1, slide2, slide3];
  const [listMovieCard, setListMovieCard] = useState<IMovie[]>([]);

  const fetchData = async () => {
    const response = await Api.get('http://localhost:9090/api/movie/find-movie-has-ticket');
    setListMovieCard(response.data.movieList);
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
