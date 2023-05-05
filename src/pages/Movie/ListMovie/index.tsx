import Pagination from 'react-bootstrap/Pagination';
import { useState, useEffect } from 'react';
import { getAllMovieForAdmin } from '../../../apis/movie.api';
import { IMovie } from '../../../shared/model/IMovie';
import { Space, Table, Tag, Button, Input, Popconfirm } from 'antd';
import { CloseCircleOutlined, QuestionCircleOutlined, ToolOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Navigate, useNavigate } from 'react-router-dom';
import './style.css';
const { Search } = Input;

function ListMovie() {
    const navigate = useNavigate();
    const [listMovie, setListMovie] = useState<IMovie[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const renderTitle = () => {
        return (
            <div className="d-flex align-items-center justify-content-between">
                <h5>Danh sách phim tại rạp</h5>
                <div>
                    <Search placeholder="Tìm theo phim" allowClear onSearch={() => {}} style={{ width: 304 }} />
                    <Button
                        type="primary"
                        className="d-inline-flex align-items-center justify-content-center ml-12"
                        icon={<PlusCircleOutlined />}
                        onClick={() => {
                            navigate('/admin/add-movie');
                        }}
                    >
                        Thêm mới
                    </Button>
                </div>
            </div>
        );
    };

    useEffect(() => {
        getAllMovieForAdmin()
            .then((res) => {
                setListMovie(res.data.data.content);
                setTotalPages(res.data.data.totalPages);
                setCurrentPage(res.data.data.pageable.pageNumber);
            })
            .catch();
    }, []);

    const tableColumns: ColumnsType<any> = [
        {
            title: 'ID phim',
            dataIndex: 'movieId',
        },
        {
            title: 'Tên phim',
            dataIndex: 'movieName',
        },
        {
            title: 'Đạo diễn',
            dataIndex: 'movieDirector',
        },
        {
            title: 'Diễn viên',
            dataIndex: 'movieActor',
        },
        {
            title: 'Thời lượng',
            dataIndex: 'movieLength',
        },
        {
            title: 'Mô tả',
            dataIndex: 'movieDescription',
        },
        {
            title: 'Poster',
            dataIndex: 'moviePoster',
            render: (moviePoster: any) => {
                return <img className="poster-image" src={moviePoster} alt="" />;
            },
        },
        {
            title: 'Trailer',
            dataIndex: 'movieTrailerUrl',
            render: (movieTrailerUrl: any) => {
                return (
                    <a target="blank" href={movieTrailerUrl}>
                        Trailer
                    </a>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (record: IMovie) => (
                <Space size="large">
                    <Button
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: 50 }}
                        block
                        icon={<ToolOutlined />}
                    />
                    <Popconfirm
                        title="Gỡ lịch chiếu này"
                        // description="Are you sure to delete this task?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => {}}
                    >
                        <Button
                            className="d-flex align-items-center justify-content-center"
                            style={{ width: 50 }}
                            block
                            icon={<CloseCircleOutlined />}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table bordered={true} title={() => renderTitle()} columns={tableColumns} dataSource={listMovie} />
        </div>
    );
}

export default ListMovie;
