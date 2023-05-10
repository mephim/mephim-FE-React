import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form, Input, Select, Spin } from 'antd';
import { addMovieRequest, findMovieByIdRequest } from '../../../../apis/movie.api';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { uploadFile } from '../../../../common';
import { IMovieCreateDto } from '../../../../shared/model/dto/IMovieCreateDto';
import { ICategory } from '../../../../shared/model/ICategory';
import { IActor } from '../../../../shared/model/IActor';
import { findAllCategoryRequest } from '../../../../apis/category.api';
import { findAllActorRequest } from '../../../../apis/actor.api';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { IMovie } from '../../../../shared/model/IMovie';

const { Option } = Select;

interface IFormInputs {
    movieName: string;
    movieDescription: number;
    movieLength: number;
    movieActor: string;
    movieDirector: number;
    moviePoster: number;
    movieTrailerUrl: number;
    movieCategoryNames: number;
}

function EditMovie() {
    const [movie, setMovie] = useState<IMovie>();
    const [listCategory, setListCategory] = useState<ICategory[]>();
    const posterRef = useRef<HTMLInputElement>(null);
    const trailerRef = useRef<HTMLInputElement>(null);
    const [categoryList, setCategoryList] = useState<ICategory[]>([]);
    const [actorList, setActorList] = useState<IActor[]>([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    console.log('Movie Model: ', movie);

    const validationSchema = Yup.object().shape({
        movieName: Yup.string().required('Trường này là bắt buộc'),
        movieDescription: Yup.string().required('Trường này là bắt buộc'),
        movieLength: Yup.number().required('Trường này là bắt buộc'),
        movieActor: Yup.string().required('Trường này là bắt buộc'),
        movieDirector: Yup.string().required('Trường này là bắt buộc'),
        moviePoster: Yup.string().required('Trường này là bắt buộc'),
        movieTrailerUrl: Yup.string().required('Trường này là bắt buộc'),
        movieCategoryNames: Yup.lazy((val) =>
            Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string().required('Trường này là bắt buộc'),
        ),
    });

    useEffect(() => {
        console.log('querry PARAM: ', id);
        findMovieByIdRequest(Number(id))
            .then((res) => {
                setMovie(res.data.data.movie);
                setCategoryList(res.data.data.categoryList);
                console.log(res);
            })
            .catch();
        findAllCategoryRequest()
            .then((res) => setCategoryList(res.data.data))
            .catch((err) => console.log(err));
        findAllActorRequest()
            .then((res) => setActorList(res.data.data))
            .catch((err) => console.log(err));
    }, []);

    const onSubmit = async (data: any) => {
        setLoading(true);
        let movieTrailerUrl;
        let moviePoster;
        if (posterRef?.current?.files && trailerRef?.current?.files) {
            moviePoster = await uploadFile(posterRef?.current?.files[0], true);
            movieTrailerUrl = await uploadFile(trailerRef?.current?.files[0], false);
        }

        const movieCategoryIds: number[] = categoryList
            .filter((category: ICategory) => {
                return data.movieCategoryNames.includes(category.categoryName);
            })
            .map((category: ICategory) => category.categoryId);

        const dataRequest: IMovieCreateDto = {
            ...data,
            moviePoster,
            movieTrailerUrl,
            movieCategoryIds,
        };

        console.log('--Data create: ', dataRequest);

        addMovieRequest(dataRequest)
            .then((res) => {
                console.log('OK');
            })
            .then((err) => console.log(err));
        setLoading(false);
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
            <Spin spinning={loading} tip="Loading" size="large" delay={500}>
                <div className="add-movie">
                    <h5 className="text-center">Thêm mới phim</h5>
                    <Form
                        labelCol={{ span: 2 }}
                        // wrapperCol={{ span: 10 }}
                        layout="horizontal"
                        onValuesChange={() => {}}
                        onFinish={handleSubmit(onSubmit)}
                    >
                        <Form.Item label="Phim">
                            <Controller
                                control={control}
                                name="movieName"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Nhập tên phim"
                                        defaultValue={movie?.movieName}
                                    />
                                )}
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

                        <Form.Item label="Diễn viên">
                            <Controller
                                control={control}
                                name="movieActor"
                                render={({ field }) => <Input {...field} type="text" placeholder="Diễn viên" />}
                            />
                            <span className="text-danger">{errors.movieActor?.message}</span>
                        </Form.Item>

                        <Form.Item label="Thể loại">
                            <Controller
                                control={control}
                                name="movieCategoryNames"
                                render={({ field }) => (
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Chọn thể loại"
                                        optionLabelProp="label"
                                        {...field}
                                    >
                                        {categoryList.map((category: ICategory) => (
                                            <Option
                                                key={category.categoryId}
                                                value={category.categoryName}
                                                label={category.categoryName}
                                            >
                                                <div className="demo-option-label-item">{category.categoryName}</div>
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                            />
                            <span className="text-danger">{errors.movieCategoryNames?.message}</span>
                        </Form.Item>

                        <Form.Item label="Poster">
                            <Controller
                                control={control}
                                name="moviePoster"
                                render={({ field }) => (
                                    <input {...field} ref={posterRef} type="file" accept="image/png, image/jpeg" />
                                )}
                            />
                            <span className="text-danger">{errors.moviePoster?.message}</span>
                        </Form.Item>

                        <Form.Item label="Trailer">
                            <Controller
                                control={control}
                                name="movieTrailerUrl"
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        ref={trailerRef}
                                        type="file"
                                        accept="video/mp4,video/x-m4v,video/*"
                                    />
                                )}
                            />
                            <span className="text-danger">{errors.movieTrailerUrl?.message}</span>
                        </Form.Item>

                        <Form.Item className="d-flex align-items-center justify-content-center">
                            <Button type="primary" htmlType="submit">
                                Thêm
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Spin>
        </Card>
    );
}

export default EditMovie;
