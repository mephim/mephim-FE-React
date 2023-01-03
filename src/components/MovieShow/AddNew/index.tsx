import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox,
    Upload,
} from 'antd';
import { Tag } from 'antd';

function AddNewTicket() {
    return <div>
        <h5>Thêm lịch chiếu - thêm vé</h5>
        <Form
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 20 }}
            layout='horizontal'
            onValuesChange={() => {
            }}
        >
            <Form.Item label='Phim'>
                <Select>
                    <Select.Option value='demo'>Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label='Ngày chiếu'>
                <Select>
                    <Select.Option value='demo'>Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label='Giờ chiếu'>
                <Select>
                    <Select.Option value='demo'>Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label='Phòng chiếu'>
                <Select>
                    <Select.Option value='demo'>Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label='Giá vé'>
                <Input type='number' placeholder='Giá vé (VND)' />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit'>
                    Thêm
                </Button>
            </Form.Item>
        </Form>
    </div>;
}

export default AddNewTicket;
