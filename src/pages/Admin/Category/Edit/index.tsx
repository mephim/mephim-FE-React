import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form, Input, Select, Spin } from 'antd';
import { addMovieRequest } from '../../../../apis/movie.api';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { uploadFile } from '../../../../common';
import { IMovieCreateDto } from '../../../../shared/model/dto/IMovieCreateDto';
import { ICategory } from '../../../../shared/model/ICategory';
import { IActor } from '../../../../shared/model/IActor';
import { addCategoryRequest, findAllCategoryRequest } from '../../../../apis/category.api';
import { findAllActorRequest } from '../../../../apis/actor.api';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';

const { Option } = Select;

interface IFormInputs {
    categoryName: string,
    description: string
}

function EditCategory() {
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        categoryName: Yup.string().required('Trường này là bắt buộc'),
        description: Yup.string().required('Trường này là bắt buộc'),
    });


    const onSubmit = async (data: IFormInputs) => {
        console.log('Submit click');
        setLoading(true);

        addCategoryRequest(data.categoryName)
            .then((res) => {
                toast.success('🦄 Thêm thể loại thành công!');
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
                    <h5 className="text-center">Chỉnh sửa thể loại</h5>
                    <Form
                        labelCol={{ span: 2 }}
                        // wrapperCol={{ span: 10 }}
                        layout="horizontal"
                        onValuesChange={() => {}}
                        onFinish={handleSubmit(onSubmit)}
                    >
                        <Form.Item label="Tên thể loại">
                            <Controller
                                control={control}
                                name="categoryName"
                                render={({ field }) => <Input {...field} type="text" placeholder="Nhập tên thể loại" />}
                            />
                            <span className="text-danger">{errors.categoryName?.message}</span>
                        </Form.Item>

                        <Form.Item label="Mô tả/ghi chú">
                            <Controller
                                control={control}
                                name="description"
                                render={({ field }) => <Input.TextArea {...field} rows={4} placeholder="Nhập mô tả/ghi chú" />}
                            />
                            <span className="text-danger">{errors.description?.message}</span>
                        </Form.Item>

                        <Form.Item className="d-flex align-items-center justify-content-center">
                            <Button type="primary" htmlType="submit">
                                Lưu
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Spin>
        </Card>
    );
}

export default EditCategory;
