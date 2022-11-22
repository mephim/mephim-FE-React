import './style.css';

interface IPropsMovieCard {
  image: string;
  name: string;
  length: number;
  room: string;
  date: string;
}

function MovieCard({ image, name, length, room, date }: IPropsMovieCard) {
  return <div className="movie-card">
    <div>
      <img src={image}  alt=''/>
    </div>
    <div className="movie-description">
      <h3 className="movie-name m-0 w-100 text-center text-truncate">{name}</h3>
      <h2 className="movie-room mt-1"><span>{length} PHÚT</span>|<span className="room-name">{room}</span></h2>
      <h2 className="movie-date text-center mt-1">KHỞI CHIẾU {date}</h2>
      <div className="action-btn">
        <button className="watch-trailer-btn">TRAILER</button>
        <button className="booking-btn">ĐẶT VÉ</button>
      </div>
    </div>
  </div>;
}

export default MovieCard;
