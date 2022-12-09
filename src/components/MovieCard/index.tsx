import './style.css';
import {useState} from "react";
import MyModal from "../CustomModal";
import ChooseShowTimeList from "../ChooseShowTimeList";
import {IMovie} from "../../shared/model/IMovie";

interface IPropsMovieCard {
  movie: IMovie;
}

function MovieCard({ movie }: IPropsMovieCard) {
  const [showModal, setShowModal] = useState(false);
  return <div className="movie-card">
    <div>
      <img src={movie.moviePoster}  alt=''/>
    </div>
    <div className="movie-description">
      <h3 className="movie-name m-0 w-100 text-center text-truncate">{movie.movieName}</h3>
      <h2 className="movie-room mt-1"><span>{movie.movieLength} PHÚT</span>|<span className="room-name">ĐANG KHỞI CHIẾU</span></h2>
      <div className="action-btn">
        <button className="watch-trailer-btn">TRAILER</button>
        <button className="booking-btn" onClick={() => setShowModal(true)}>ĐẶT VÉ</button>
      </div>
    </div>
    {showModal && <MyModal show={true} content={<ChooseShowTimeList movie={movie} />}  onHide={() => setShowModal(false)} heading={"Lịch chiếu"}/>}
  </div>;
}

export default MovieCard;
