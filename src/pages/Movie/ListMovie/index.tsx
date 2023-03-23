import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { useState, useEffect } from 'react';
import { getAllMovieForAdmin } from '../../../apis/movie.api';
import { IMovie } from '../../../shared/model/IMovie';
import './style.css';

function ListMovie() {
    const [listMovie, setListMovie] = useState<IMovie[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        getAllMovieForAdmin()
            .then((res) => {
                setListMovie(res.data.data.content);
                setTotalPages(res.data.data.totalPages);
                setCurrentPage(res.data.data.pageable.pageNumber);
            })
            .catch();
    }, []);

    return (
        <div>
            <h3>Danh sách phim</h3>
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên phim</th>
                        <th>Đạo diễn</th>
                        <th>Diễn viên</th>
                        <th>Thời lượng</th>
                        <th>Mô tả</th>
                        <th>Poster</th>
                        <th>Trailer</th>
                    </tr>
                </thead>
                <tbody>
                    {listMovie.map((movie: IMovie, index: number) => (
                        <tr>
                            <td>{index}</td>
                            <td>{movie?.movieName}</td>
                            <td>{movie?.movieDirector}</td>
                            <td>{movie?.movieActor}</td>
                            <td>{movie?.movieLength}</td>
                            <td>{movie?.movieDescription}</td>
                            <td>
                                <img className="poster-image" src={movie?.moviePoster} alt="" />
                            </td>
                            <td>
                                <a target="blank" href={movie?.movieTrailerUrl}>
                                    Trailer
                                </a>
                            </td>
                            <td>
                                <button className="btn btn-light">
                                    <svg
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z"
                                            fill="#828831"
                                        />
                                    </svg>
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-light">
                                    <svg
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1Zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648Zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648ZM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5Z"
                                            fill="#da1919"
                                        />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                <Pagination.First disabled={Number(currentPage)===0} />
                <Pagination.Prev />
                <Pagination.Item><span>{currentPage+1}</span></Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </div>
    );
}

export default ListMovie;
