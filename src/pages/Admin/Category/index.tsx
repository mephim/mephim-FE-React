import { Space, Table, Tag, Button, Input, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ToolOutlined, PlusCircleOutlined, CloseCircleOutlined, QuestionCircleOutlined, IssuesCloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { IRoomResponse } from '../../../shared/model/response/IRoomResponse';
import { findAllCategoryRequest } from '../../../apis/category.api';
import { ICategory } from '../../../shared/model/ICategory';
const { Search } = Input;
function Category() {
    const navigate = useNavigate();
    const [listRoom, setListRoom] = useState<ICategory[]>([]);
    console.log('---list room: ', listRoom);
    useEffect(() => {
        findAllCategoryRequest()
            .then((res) => setListRoom(res.data.data))
            .catch((err) => console.log(err));
    }, []);

    const goToRoomDetail = (roomId: number) => {};

    const renderTitle = () => {
        return (
            <div className="d-flex align-items-center justify-content-between">
                <h5>Danh sách Thể loại</h5>
                <div>
                    <Search placeholder="Tìm theo thể loại" allowClear onSearch={() => {}} style={{ width: 304 }} />
                    <Button
                        type="primary"
                        className="d-inline-flex align-items-center justify-content-center ml-12"
                        icon={<PlusCircleOutlined />}
                        onClick={() => {
                            navigate('/admin/add-category');
                        }}
                    >
                        Thêm mới
                    </Button>
                </div>
            </div>
        );
    };

    const confirmDelete = (roomId: number) => {};

    const tableColumns: ColumnsType<any> = [
        {
            title: 'ID Thể loại',
            dataIndex: 'categoryId',
        },
        {
            title: 'Tên thể loại',
            dataIndex: 'categoryName',
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
            render: (record: IRoomResponse) => (
                <Space size="small">
                    <Button
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: 50 }}
                        block
                        icon={<ToolOutlined />}
                    />
                    <Button
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: 50 }}
                        block
                        icon={<IssuesCloseOutlined />}
                    />
                    <Popconfirm
                        title="Gỡ phòng chiếu này"
                        // description="Are you sure to delete this task?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => confirmDelete(record.roomId)}
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
            <Table bordered={true} title={() => renderTitle()} columns={tableColumns} dataSource={listRoom} />
        </div>
    );
}
export default Category;
