import { Button, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { uploadFile } from '../../../../common';

interface IFormInputs {
    movieName: string;
    movieDescription: number;
    movieLength: number;
    movieDirector: number;
    moviePoster: number;
    movieTrailerUrl: number;
}
function AddNewMovie() {

    const posterRef = useRef<HTMLInputElement>(null);
    const trailerRef = useRef<HTMLInputElement>(null);

    const validationSchema = Yup.object().shape({
        movieName: Yup.string().required('Trường này là bắt buộc'),
        movieDescription: Yup.string().required('Trường này là bắt buộc'),
        movieLength: Yup.number().required('Trường này là bắt buộc'),
        movieDirector: Yup.string().required('Trường này là bắt buộc'),
        moviePoster: Yup.string().required('Trường này là bắt buộc'),
        movieTrailerUrl: Yup.string().required('Trường này là bắt buộc'),
    });

    const [poster, setPoster] = useState<any>();
    const [trailer, setTrailer] = useState<any>();

    const uploadPoster = () => {
        uploadFile(poster, true).then((res) => console.log('---url: ', res));
    };

    const uploadTraler = () => {
        uploadFile(poster, false).then((res) => console.log('---url: ', res));
    };

    const handleChooseFile = (event: any) => {
        setPoster(event?.target?.files[0]);
    };

    const handleChangePoster = (e: any) => {
        if(posterRef?.current?.files){
            console.log('--poster: ',posterRef?.current?.files[0] );
            setPoster(posterRef?.current?.files[0]);
        }
    }

    const onSubmit = async (data: any) => {
        console.log('--click submit');
        console.log('---data: ', data);
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: yupResolver(validationSchema),
    });

    return (
        <div className="add-movie">
            <h5>Thêm mới phim</h5>
            <Form
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 60 }}
                layout="horizontal"
                onValuesChange={() => {}}
                onFinish={handleSubmit(onSubmit)}
            >
                <Form.Item label="Phim">
                    <Controller
                        control={control}
                        name="movieName"
                        render={({ field }) => <Input {...field} type="text" placeholder="Nhập tên phim" />}
                    />
                    <span className="text-danger">{errors.movieName?.message}</span>
                </Form.Item>

                <Form.Item label="Mô tả">
                    <Controller
                        control={control}
                        name="movieDescription"
                        render={({ field }) => <Input.TextArea {...field} rows={4} placeholder="Mô tả phim" />}
                    />
                    <span className="text-danger">{errors.movieDescription?.message}</span>
                </Form.Item>

                <Form.Item label="Thời lượng">
                    <Controller
                        control={control}
                        name="movieLength"
                        render={({ field }) => <Input {...field} type="number" placeholder="phút" />}
                    />
                    <span className="text-danger">{errors.movieLength?.message}</span>
                </Form.Item>

                <Form.Item label="Đạo diễn">
                    <Controller
                        control={control}
                        name="movieDirector"
                        render={({ field }) => <Input {...field} type="text" placeholder="Đạo diễn" />}
                    />
                    <span className="text-danger">{errors.movieDirector?.message}</span>
                </Form.Item>

                <Form.Item label="Poster">
                    <Controller
                        control={control}
                        name="moviePoster"
                        render={({ field }) => <input ref={posterRef} onChange={(e) => handleChangePoster(e)} type="file" accept="image/png, image/jpeg" />}
                    />
                    <span className="text-danger">{errors.moviePoster?.message}</span>
                </Form.Item>

                <Form.Item label="Trailer">
                    <Controller
                        control={control}
                        name="movieTrailerUrl"
                        render={({ field }) => <Input {...field}  type="file" accept="video/mp4,video/x-m4v,video/*" />}
                    />
                    <span className="text-danger">{errors.movieTrailerUrl?.message}</span>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddNewMovie;
