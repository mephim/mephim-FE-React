import './style.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react';
import { NavigateFunction, useLocation, useNavigate, useParams } from "react-router";
import { findMovieByIdRequest } from '../../../apis/movie.api';
import { ICategory } from '../../../shared/model/ICategory';
import { IActor } from '../../../shared/model/IActor';
import { IMovie } from '../../../shared/model/IMovie';
import MyModal from '../../../components/CustomModal';
import ChooseShowTimeList from '../../../components/ChooseShowTimeList';
import Trailer from '../../../components/Trailler';

function MovieDetail() {
    const params = useParams();
    console.log(params.id);

    const [movie, setMovie] = useState<IMovie>();
    const [categoryList, setCategoryList] = useState<ICategory[]>([]);
    const [actorList, setActorList] = useState<IActor[]>([]);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showTrailerModal, setShowTrailerModal] = useState(false);

    console.log('movie: ', movie, ' categoryList: ', categoryList, ' actorList: ', actorList);

    useEffect(() => {
        findMovieByIdRequest(Number(params.id)).then(res => {
            setMovie(res.data.data.movie);
            setCategoryList(res.data.data.categoryList);
            setActorList(res.data.data.actorList);
        }).catch(error => console.log(error))
    },[]);
    return <div className="detail mt-30">
        <Container>
            <Row>
                <Col>
                    <div className="movie-info">
                        <div className="poster">
                            <img src='https://metiz.vn/media/poster_film/321986917_1318882765574216_8856448085308688207_n.jpg' alt='' />
                        </div>
                        <div className="info ml-20">
                            <h2 className="fw-bold text-uppercase">Nhà bà nữ</h2>
                            <p>Đạo diễn: <span>{movie?.movieDirector}</span></p>
                            <p>Diễn viên: <span>{movie?.movieActor}</span></p>
                            <p>Thể loại: {categoryList.map((category: ICategory) => (
                                <span key={category.categoryId}>{category.categoryName}, </span>
                            ))}</p>
                            <p>Thời lượng: <span>{movie?.movieLength} phút</span></p>
                        </div>
                    </div>
                    <div className="action">
                        <button onClick={() => setShowTrailerModal(true)}>Trailer</button>
                        <button onClick={() => setShowBookingModal(true)}>Đặt vé</button>
                    </div>
                    <div className="description">
                        <p>{movie?.movieDescription}</p>
                    </div>
                </Col>
            </Row>
        </Container>

        {showBookingModal &&
        <MyModal show={true} content={<ChooseShowTimeList movie={movie} />} onHide={() => setShowBookingModal(false)}
                 heading={'Lịch chiếu'} />}
        {showTrailerModal &&
        <MyModal show={true} content={<Trailer videoSrc={movie?.movieTrailerUrl} />} onHide={() => setShowTrailerModal(false)}
                 heading={'Trailer'} />}
    </div>;
}

export default MovieDetail;
