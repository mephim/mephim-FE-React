import './style.css';
import { useState } from 'react';
import MyModal from '../CustomModal';
import ChooseShowTimeList from '../ChooseShowTimeList';
import { IMovie } from '../../shared/model/IMovie';
import Trailer from '../Trailler';
import {useNavigate} from 'react-router-dom';

interface IPropsMovieCard {
    movie: IMovie;
}

function MovieCard({ movie }: IPropsMovieCard) {
    const navigate = useNavigate();
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showTrailerModal, setShowTrailerModal] = useState(false);
    return <div className='movie-card'>
        <div onClick={() => navigate('/movie/detail/' + movie.movieId)}>
            <img src={movie.moviePoster} alt='' />
        </div>
        <div className='movie-description'>
            <h3 className='movie-name m-0 w-100 text-center text-truncate'>{movie.movieName}</h3>
            <h2 className='movie-room mt-1'><span>{movie.movieLength} PHÚT</span>|<span className='room-name'>ĐANG KHỞI CHIẾU</span>
            </h2>
            <div className='action-btn'>
                <button className='watch-trailer-btn' onClick={() => setShowTrailerModal(true)}>TRAILER</button>
                <button className='booking-btn' onClick={() => setShowBookingModal(true)}>ĐẶT VÉ</button>
            </div>
        </div>
        {showBookingModal &&
        <MyModal show={true} content={<ChooseShowTimeList movie={movie} />} onHide={() => setShowBookingModal(false)}
                 heading={'Lịch chiếu'} />}
        {showTrailerModal &&
        <MyModal show={true} content={<Trailer videoSrc={movie.movieTrailerUrl} />} onHide={() => setShowTrailerModal(false)}
                 heading={'Trailer'} />}
    </div>;
}

export default MovieCard;
