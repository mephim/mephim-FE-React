import React, { useEffect, useState } from 'react';
import { adminFindAllShowRequest } from '../../../../apis/show.api';
import { IShowResponse } from '../../../../shared/model/IShowResponse';
import { CloseCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Space, Table, Tag, Button, Tooltip, Popconfirm } from 'antd';
import Constant from '../../../../shared/constants';
import { numberWithCommas } from '../../../../shared/common';
import { deleteTicketRequest } from '../../../../apis/ticket.api';
import { toast } from 'react-toastify';

const { Column, ColumnGroup } = Table;

function List2() {
    const [listShow, setListShow] = useState<IShowResponse[]>([]);
    const [reload, setReload] = useState<boolean>(false);
    console.log('---list show: ', listShow);
    useEffect(() => {
        adminFindAllShowRequest()
            .then((res) => setListShow(res.data.data))
            .catch((err) => console.log(err));
    }, []);

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
    return (
        <div>
            <h4>Lịch chiếu phim tại rạp</h4>
            <div>
                <Table dataSource={listShow}>
                    <Column title="ID vé" dataIndex="ticketId" key="ticketId" />
                    <Column title="Tên phim" dataIndex="movieName" key="movieName" />
                    <Column
                        title="Phòng chiếu"
                        dataIndex="roomName"
                        key="roomName"
                        render={(roomName: string) => (
                            <>
                                <Tag color={getRoomColor(roomName)} key={roomName}>
                                    {roomName}
                                </Tag>
                            </>
                        )}
                    />
                    <Column title="Thời gian bắt đầu" dataIndex="timeStart" key="timeStart" />
                    <Column title="Thời gian kết thúc" dataIndex="timeEnd" key="timeEnd" />
                    <Column
                        title="Giá vé"
                        dataIndex="ticketPrice"
                        key="ticketPrice"
                        render={(ticketPrice: string) => (
                            <>
                                <Tag color="#f50" key={ticketPrice}>
                                    {numberWithCommas(Number(ticketPrice))} đ
                                </Tag>
                            </>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(_: any, record: IShowResponse) => (
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
                        )}
                    />
                </Table>
            </div>
        </div>
    );
}

export default List2;
