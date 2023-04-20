import React, { useContext, useEffect, useState } from 'react';
import { IMovie } from '../../../shared/model/IMovie';
import { getMovieByNameRequest, getMovieHasTicketRequestByCategory } from '../../../apis/movie.api';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MovieCard from '../../../components/MovieCard';
import './style.css';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom';
import { ICategory } from '../../../shared/model/ICategory';
import { findAllCategoryRequest } from '../../../apis/category.api';
import Context from '../../../context/context';

function MovieShowing() {
    const context = useContext(Context);
    const location = useLocation();
    const [listMovieCard, setListMovieCard] = useState<IMovie[]>([]);
    const [categoryList, setCategoryList] = useState<ICategory[]>([]);
    const [categoryId, setCategoryId] = useState<number>(0);
    const params = new URLSearchParams(location.search);

    useEffect(() => {
        findAllCategoryRequest().then(res => setCategoryList(res.data.data)).catch(err => console.log(err));
    }, []);

    useEffect(() => {
        console.log('Context change');
    }, []);

    useEffect(() => {
        console.log('Change result');
        console.log('keySearch: ', context.keySearch);
        getMovieByNameRequest(context.keySearch).then((res) => {
            console.log('Res: ', res);
            setListMovieCard(res.data.data.movieList);
        });
    }, [context.keySearch]);

    useEffect(() => {
        getMovieHasTicketRequestByCategory(categoryId).then((res) => {
            console.log('Res by category: ', res);
            setListMovieCard(res.data.data.movieList);
        });
    }, [categoryId]);

    const handleChangeSelectCategory = (event: any) => {
        setCategoryId(event.target.value);
        console.log('categoryId.current:   ', categoryId);
    };

    return <div className='showing mt-30'>
        <Container>
            <Row>
                <Col>
                    <h2 className='mb-30'>Phim đang chiếu</h2>
                </Col>
                <Col>
                    <div className='d-flex justify-content-end'>
                        <Form.Select size='sm' className='w-50' onChange={e => handleChangeSelectCategory(e)}>
                            <option value={0}>Thể loại</option>
                            {categoryList.map((category: ICategory) => (
                                <option key={category.categoryId}
                                        value={category.categoryId}>{category.categoryName}</option>
                            ))}
                        </Form.Select>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    {listMovieCard && listMovieCard.map((movie: IMovie) => (
                        <span key={movie.movieId} className='px-1'>
                            <MovieCard movie={movie} />
                        </span>
                    ))}
                    {
                        typeof(listMovieCard) == "undefined" && <h5>Không có kết quả</h5>
                    }
                </Col>
            </Row>
        </Container>
    </div>;
}

export default MovieShowing;
