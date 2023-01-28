import React, { useEffect, useState } from 'react';
import { IMovie } from '../../../shared/model/IMovie';
import { getMovieHasTicketRequest } from '../../../apis/movie.api';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MovieCard from '../../../components/MovieCard';
import './style.css';

function MovieShowing() {
    const [listMovieCard, setListMovieCard] = useState<IMovie[]>([]);

    useEffect(()=> {
        getMovieHasTicketRequest().then((res) => {
            setListMovieCard(res.data.data.movieList);
        });
    }, []);

    return <div className="showing mt-30">
        <Container>
            <Row>
                <Col>
                    <h2 className="mb-30">Phim đang chiếu</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    {listMovieCard.map((movie: IMovie) => (
                        <span key={Math.random()} className='px-1'>
                            <MovieCard movie={movie} />
                        </span>
                    ))}
                </Col>
            </Row>
        </Container>
    </div>;
}

export default MovieShowing;
