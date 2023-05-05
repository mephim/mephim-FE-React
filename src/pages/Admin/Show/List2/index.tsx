import React, { useEffect, useState } from 'react';
import { adminFindAllShowRequest } from '../../../../apis/show.api';
import { IShowResponse } from '../../../../shared/model/IShowResponse';
import { CloseCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Space, Table, Tag, Button, Input, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Constant from '../../../../shared/constants';
import { numberWithCommas } from '../../../../shared/common';
import { deleteTicketRequest } from '../../../../apis/ticket.api';
import { toast } from 'react-toastify';
const { Search } = Input;

function List2() {
    const [listShow, setListShow] = useState<IShowResponse[]>([]);
    const [reload, setReload] = useState<boolean>(false);
    console.log('---list show: ', listShow);
    useEffect(() => {
        adminFindAllShowRequest()
            .then((res) => setListShow(res.data.data))
            .catch((err) => console.log(err));
    }, []);
    const renderTitle = () => {
        return (
            <div className="d-flex align-items-center justify-content-between">
                <h5>Lịch chiếu phim tại rạp</h5>
                <Search placeholder="Tìm theo phim" allowClear onSearch={() => {}} style={{ width: 304 }} />
            </div>
        );
    };

    const getRoomColor = (roomName: string) => {
        switch (roomName) {
            case 'R01':
                return Constant.SHOW.ROOM_TAG_COLOR.R01;
            case 'R02':
                return Constant.SHOW.ROOM_TAG_COLOR.R02;
            case 'R03':
                return Constant.SHOW.ROOM_TAG_COLOR.R03;
            case 'R04':
                return Constant.SHOW.ROOM_TAG_COLOR.R04;
            default:
                return '';
        }
    };

    const confirmDelete = (ticketId: number) => {
        deleteTicketRequest(ticketId)
            .then(() => {
                toast.success('🦄 Đã gỡ lịch chiếu');
                setReload(!reload);
            })
            .catch((err) => console.log(err));
    };

    const tableColumns: ColumnsType<any> = [
        {
            title: 'ID vé',
            dataIndex: 'ticketId',
        },
        {
            title: 'Tên phim',
            dataIndex: 'movieName',
        },
        {
            title: 'Phòng chiếu',
            dataIndex: 'roomName',
            render: (roomName: any) => {
                return (
                    <Tag color={getRoomColor(roomName)} key={roomName}>
                        {roomName}
                    </Tag>
                );
            },
        },
        {
            title: 'Thời gian bắt đầu',
            dataIndex: 'timeStart',
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'timeStart',
        },
        {
            title: 'Giá vé',
            dataIndex: 'ticketPrice',
            sorter: {
                compare: (a, b) => {
                    console.log('sort nha: ');

                    return a - b;
                },
            },
            render: (ticketPrice: number) => (
                <Tag color="#f50" key={ticketPrice}>
                    {numberWithCommas(Number(ticketPrice))} đ
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (record: IShowResponse) => (
                <Space size="large">
                    <Popconfirm
                        title="Gỡ lịch chiếu này"
                        // description="Are you sure to delete this task?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => confirmDelete(record.ticketId)}
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
            <Table bordered={true} title={() => renderTitle()} columns={tableColumns} dataSource={listShow} />
        </div>
    );
}

export default List2;
