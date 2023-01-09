import "./style.css";
import slide1 from "../../assets/images/slide1.jpg";
import slide2 from "../../assets/images/slide2.jpg";
import slide3 from "../../assets/images/slide3.jpg";
import CustomCarousel from "../../components/CustomCarousel";
import CustomSlider from "../../components/CustomSlickSlide";
import { IMovie } from "../../shared/model/IMovie";
import React, {useEffect, useState} from "react";
import {getAllMoviesRequest} from "../../apis/movie.api";

function Home() {
  const listImageSrc: string[] = [slide1, slide2, slide3];
  const [listMovieCard, setListMovieCard] = useState<IMovie[]>([]);

  const fetchData = async () => {
    getAllMoviesRequest().then((res) => {
      setListMovieCard(res.data.data.movieList);
    });
  };

  useEffect(()=> {
    fetchData();
  }, []);

  return (
    <div className="home">
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
