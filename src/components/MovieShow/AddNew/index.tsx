import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';

import './style.css';
import { getAllMovieRequest, getMovieHasTicketRequestByCategory } from '../../../apis/movie.api';
import { findAllShowDateRequest, findAllShowTimeRequest } from '../../../apis/show.api';
import { IMovie } from '../../../shared/model/IMovie';
import { IShowDate } from '../../../shared/model/IShowDate';
import { IShowTime } from '../../../shared/model/IShowTime';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { findALlRoomSeatRequest } from '../../../apis/room.api';
import { IRoom } from '../../../shared/model/IRoom';
import { createTicketRequest } from '../../../apis/ticket.api';
import { toast } from 'react-toastify';
import Constants from '../../../shared/constants';
import Card from 'react-bootstrap/Card';

interface IProp {
    onSuccess: () => void;
}

interface IFormInputs {
    movieId: number;
    showDateId: number;
    showTimeId: number;
    roomId: number;
    price: number;
}

function AddNewTicket({ onSuccess }: IProp) {
    const [movieList, setMovieList] = useState([]);
    const [showDateList, setShowDateList] = useState([]);
    const [showTimeList, setShowTimeList] = useState([]);
    const [roomList, setRoomList] = useState([]);

    const getAllMovie = () => {
        getAllMovieRequest().then((res) => setMovieList(res.data));
    };

    const getAllShowDate = () => {
        findAllShowDateRequest().then((res) => setShowDateList(res.data.data));
    };

    const getAllShowTime = () => {
        findAllShowTimeRequest().then((res) => setShowTimeList(res.data.data));
    };
    const getAllRoom = () => {
        findALlRoomSeatRequest().then((res) => setRoomList(res.data.data));
    };

    useEffect(() => {
        getAllMovie();
        getAllShowDate();
        getAllShowTime();
        getAllRoom();
    }, []);

    const validationSchema = Yup.object().shape({
        movieId: Yup.number().required('Trường này là bắt buộc'),
        showDateId: Yup.number().required('Trường này là bắt buộc'),
        showTimeId: Yup.number().required('Trường này là bắt buộc'),
        roomId: Yup.number().required('Trường này là bắt buộc'),
        price: Yup.number().min(0, 'Giá tiền phải lớn hơn 0 VND').required('Trường này là bắt buộc'),
    });

    const onSubmit = async (data: any) => {
        createTicketRequest({ ...data })
            .then((res) => {
                toast.success('🦄 Đã thêm 1 lịch chiếu!', Constants.TOAST_OPTION_DEFAULT);
                onSuccess();
            })
            .catch((e) => {
                toast.error('🦄 Đã có 1 lịch chiếu vào khung giờ này!', Constants.TOAST_OPTION_DEFAULT);
            });
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: yupResolver(validationSchema),
    });

    return (
        <Card body>
            <div className="add-ticket">
                <h5 className="text-center">Thêm lịch chiếu - thêm vé</h5>
                <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 60 }}
                    layout="horizontal"
                    onValuesChange={() => {}}
                    onFinish={handleSubmit(onSubmit)}
                >
                    <Form.Item label="Phim">
                        <Controller
                            control={control}
                            name="movieId"
                            render={({ field }) => (
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    placeholder="Chọn phim"
                                    {...field}
                                >
                                    {movieList.map((movie: IMovie) => (
                                        <Select.Option key={movie.movieId} value={movie.movieId}>
                                            {movie.movieName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        />
                        <span className="text-danger">{errors.movieId?.message}</span>
                    </Form.Item>

                    <Form.Item label="Ngày chiếu">
                        <Controller
                            control={control}
                            name="showDateId"
                            render={({ field }) => (
                                <Select placeholder="Chọn ngày chiếu" {...field}>
                                    {showDateList.map((showDate: IShowDate) => (
                                        <Select.Option key={showDate.showDateId} value={showDate.showDateId}>
                                            {showDate.date}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        />
                        <span className="text-danger">{errors.showDateId?.message}</span>
                    </Form.Item>

                    <Form.Item label="Giờ chiếu">
                        <Controller
                            control={control}
                            name="showTimeId"
                            render={({ field }) => (
                                <Select placeholder="Chọn giờ chiếu" {...field}>
                                    {showTimeList.map((showTime: IShowTime) => (
                                        <Select.Option key={showTime.showTimeId} value={showTime.showTimeId}>
                                            {showTime.time}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        />
                        <span className="text-danger">{errors.showTimeId?.message}</span>
                    </Form.Item>

                    <Form.Item label="Phòng chiếu">
                        <Controller
                            control={control}
                            name="roomId"
                            render={({ field }) => (
                                <Select placeholder="Chọn phòng chiếu" {...field}>
                                    {roomList.map((room: IRoom) => (
                                        <Select.Option key={room.roomId} value={room.roomId}>
                                            {room.roomName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        />
                        <span className="text-danger">{errors.roomId?.message}</span>
                    </Form.Item>

                    <Form.Item label="Giá vé">
                        <Controller
                            control={control}
                            name="price"
                            render={({ field }) => <Input {...field} type="number" placeholder="Giá vé (VND)" />}
                        />
                        <span className="text-danger">{errors.price?.message}</span>
                    </Form.Item>

                    <Form.Item className="d-flex align-items-center justify-content-center">
                        <Button type="primary" htmlType="submit">
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Card>
    );
}

export default AddNewTicket;
