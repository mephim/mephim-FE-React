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
import Rate from '../../../components/Rate';
import StarsRating from 'react-star-rate';

function MovieDetail() {
    const params = useParams();
    console.log(params.id);

    const [movie, setMovie] = useState<IMovie>();
    const [categoryList, setCategoryList] = useState<ICategory[]>([]);
    const [actorList, setActorList] = useState<IActor[]>([]);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showTrailerModal, setShowTrailerModal] = useState(false);
    const [value, setValue] = useState<number>(0);

    console.log('movie: ', movie, ' categoryList: ', categoryList, ' actorList: ', actorList);

    useEffect(() => {
        findMovieByIdRequest(Number(params.id)).then(res => {

            console.log('Response movie: ', res);

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
                            <img src={movie?.moviePoster} alt='' />
                        </div>
                        <div className="info ml-20">
                            <h2 className="fw-bold text-uppercase">{movie?.movieName}</h2>
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
                    <div>
                        <h5>Đánh giá</h5>
                        <div className="rate-star mb-12">
                            <StarsRating
                                value={value}
                                onChange={(value) => {
                                    if (value) setValue(value);
                                }}
                            />
                            <input className="form-control mt-12" type='input-rate' placeholder="Viết suy nghĩ của bạn"/>
                            <div className="d-flex justify-content-center mt-12">
                                <button className="btn btn-primary">Đăng</button>
                            </div>
                        </div>
                        <Rate username={"lchau"} numRate={5} content={"phim hay"} isLiked/>
                        <Rate username={"lchau"} numRate={5} content={"phim hay"} isLiked/>
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
