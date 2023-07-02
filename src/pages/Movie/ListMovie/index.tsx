import React, { useState, useEffect } from 'react';
import {
    deleteMovieRequest, getAllForUserMovieRequest,
    getAllMovieForAdmin,
    getAllMovieForAdminByMovieName,
    visibleMovieRequest,
} from '../../../apis/movie.api';
import { IMovie } from '../../../shared/model/IMovie';
import { Space, Table, Tag, Button, Input, Popconfirm } from 'antd';
import { CloseCircleOutlined, QuestionCircleOutlined, ToolOutlined, PlusCircleOutlined, IssuesCloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Navigate, useNavigate } from 'react-router-dom';
import './style.css';

const { Search } = Input;

function ListMovie() {
    const navigate = useNavigate();
    const [listMovie, setListMovie] = useState<IMovie[]>([]);
    const [toggleState, setToggleState] = useState<Boolean>(false);

    useEffect(() => {
        getAllMovieForAdmin()
            .then((res) => {
                setListMovie(res.data.data);
                console.log('Movie: ', res.data.data);
            })
            .catch();
    }, [toggleState]);

    const getAllMovieByName = (value: string) => {
        getAllMovieForAdminByMovieName(value)
            .then((res) => {
                setListMovie(res.data.data);
            })
            .catch();
    };

    const renderTitle = () => {
        return (
            <div className="d-flex align-items-center justify-content-between">
                <h5>Danh sách phim tại rạp</h5>
                <div>
                    <Search
                        placeholder="Tìm theo phim"
                        allowClear
                        onSearch={(value) => getAllMovieByName(value)}
                        style={{ width: 304 }}
                    />
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

    const visibleMovie = (movieId: number, isEnable: boolean) => {
        visibleMovieRequest(movieId, isEnable).then(res => setToggleState(!toggleState))
    };

    const deleteMovie = (movieId: number) => {
        deleteMovieRequest(movieId).then(res => setToggleState(!toggleState))
    };

    const tableColumns: ColumnsType<any> = [
        {
            title: 'ID phim',
            dataIndex: 'movieId',
        },
        {
            title: 'Tên phim',
            dataIndex: 'movieName',
            render: (movieName: any) => {
                return <span className="d-inline-block text-truncate" style={{maxWidth: 150}}>{movieName}</span>;
            },
        },
        {
            title: 'Đạo diễn',
            dataIndex: 'movieDirector',
            render: (movieDirector: any) => {
                return <span className="d-inline-block text-truncate" style={{maxWidth: 150}}>{movieDirector}</span>;
            },
        },
        {
            title: 'Diễn viên',
            dataIndex: 'movieActor',
            render: (movieActor: any) => {
                return <span className="d-inline-block text-truncate" style={{maxWidth: 150}}>{movieActor}</span>;
            },
        },
        {
            title: 'Thời lượng',
            dataIndex: 'movieLength',
        },
        {
            title: 'Mô tả',
            dataIndex: 'movieDescription',
            render: (movieDescription: any) => {
                return <span className="d-inline-block text-truncate" style={{maxWidth: 150}}>{movieDescription}</span>;
            },
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
            title: 'Trạng thái',
            dataIndex: 'isEnable',
            align: 'center',
            render: (isEnable: boolean) => {
                return (
                    <>
                        {isEnable && <Tag color="green">Open</Tag>}
                        {!isEnable && <Tag color="volcano">Close</Tag>}
                    </>
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
                        onClick={() => {
                            navigate('/admin/edit-movie/' + record.movieId);
                        }}
                    />
                    <Button
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: 50 }}
                        block
                        icon={<IssuesCloseOutlined />}
                        onClick={() => visibleMovie(Number(record.movieId), !Boolean(record.isEnable))}
                    />
                    <Popconfirm
                        title="Gỡ phim này"
                        // description="Are you sure to delete this task?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => deleteMovie(Number(record.movieId))}
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
