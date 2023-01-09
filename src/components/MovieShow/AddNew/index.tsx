import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';

import './style.css';
import { getAllMoviesRequest } from '../../../apis/movie.api';
import { findAllShowDateRequest, findAllShowTimeRequest } from '../../../apis/show.api';
import { IMovie } from '../../../shared/model/IMovie';
import { IShowDate } from '../../../shared/model/IShowDate';
import { IShowTime } from '../../../shared/model/IShowTime';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { findALlRoomRequest } from '../../../apis/room.api';
import { IRoom } from '../../../shared/model/IRoom';

interface IFormInputs {
    movieId: number;
    showDateId: number;
    showTimeId: number;
    roomId: number;
    price: number;
}

function AddNewTicket() {
    const [movieList, setMovieList] = useState([]);
    const [showDateList, setShowDateList] = useState([]);
    const [showTimeList, setShowTimeList] = useState([]);
    const [roomList, setRoomList] = useState([]);

    console.log('Áll Data: ', { movieList, showDateList, showTimeList, roomList });

    const getAllMovie = () => {
        getAllMoviesRequest().then((res) => setMovieList(res.data.data.movieList));
    };

    const getAllShowDate = () => {
        findAllShowDateRequest().then((res) => setShowDateList(res.data.data));
    };

    const getAllShowTime = () => {
        findAllShowTimeRequest().then((res) => setShowTimeList(res.data.data));
    };
    const getAllRoom = () => {
        findALlRoomRequest().then((res) => setRoomList(res.data.data));
    };


    useEffect(() => {
        getAllMovie();
        getAllShowDate();
        getAllShowTime();
        getAllRoom();
    }, []);

    const validationSchema = Yup.object().shape({
        movieId: Yup.string().required('Trường này là bắt buộc'),
        showDateId: Yup.string().required('Trường này là bắt buộc'),
        showTimeId: Yup.string().required('Trường này là bắt buộc'),
        roomId: Yup.string().required('Trường này là bắt buộc'),
        price: Yup.string().required('Trường này là bắt buộc'),
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: yupResolver(validationSchema),
    });

    // const onSubmit = (data: any) => {
    //     console.log('Obsubmit form');
    //     const { movieId, showDateId, showTimeId, roomId, price } = data;
    //     console.log({ movieId, showDateId, showTimeId, roomId, price });
    // };

    return (
        <div className="add-ticket">
            <h5>Thêm lịch chiếu - thêm vé</h5>
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 60 }}
                layout="horizontal"
                onValuesChange={() => {}}
                // onSubmit={handleSubmit(data => console.log(data))}
            >
                <Form.Item label="Phim">
                    <Controller
                        control={control}
                        name='movieId'
                        render={({ field }) => (
                            <Select placeholder='Chọn phim' {...field}>
                                {movieList.map((movie: IMovie) => (
                                    <Select.Option key={movie.movieId} value={movie.movieId}>
                                        {movie.movieName}
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    />
                </Form.Item>

                <Form.Item label="Ngày chiếu">
                    <Controller
                        control={control}
                        name='showDateId'
                        render={({ field }) => (
                            <Select placeholder='Chọn ngày chiếu' {...field}>
                                {showDateList.map((showDate: IShowDate) => (
                                    <Select.Option key={showDate.showDateId} value={showDate.showDateId}>
                                        {showDate.date}
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    />
                </Form.Item>

                <Form.Item label="Giờ chiếu">
                    <Controller
                        control={control}
                        name='showTimeId'
                        render={({ field }) => (
                            <Select placeholder='Chọn giờ chiếu' {...field}>
                                {showTimeList.map((showTime: IShowTime) => (
                                    <Select.Option key={showTime.showTimeId} value={showTime.showTimeId}>
                                        {showTime.time}
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    />
                </Form.Item>

                <Form.Item label="Phòng chiếu">
                    <Controller
                        control={control}
                        name='roomId'
                        render={({ field }) => (
                            <Select placeholder='Chọn phòng chiếu' {...field}>
                                {roomList.map((room: IRoom) => (
                                    <Select.Option key={room.roomId} value={room.roomId}>
                                        {room.roomName}
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    />
                </Form.Item>

                <Form.Item label="Giá vé">
                    <Controller
                        control={control}
                        name='price'
                        render={({ field }) => (
                            <Input {...field} type="number" placeholder="Giá vé (VND)" />
                        )}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmit(data => console.log(data))
                        }}
                        type="primary"
                        htmlType="submit"
                    >
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddNewTicket;
