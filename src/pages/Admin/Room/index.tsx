import React, { useEffect, useState } from 'react';
import { IRoomResponse } from '../../../shared/model/response/IRoomResponse';
import { findAllRoom } from '../../../apis/room.api';
import { Space, Table, Tag, Button } from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Line } from '@ant-design/plots';

const { Column, ColumnGroup } = Table;

function ListRoom() {
    const navigate = useNavigate();
    const [listRoom, setListRoom] = useState<IRoomResponse[]>([]);
    console.log('---list room: ', listRoom);
    useEffect(() => {
        findAllRoom()
            .then((res) => setListRoom(res.data.data))
            .catch((err) => console.log(err));
    }, []);

    const goToRoomDetail = (roomId: number) => {

    };

    const goToAddRoomPage = () => {
        navigate('/admin/add-room')
    };

    return (
        <div className='p-2'>
            <div className='d-flex align-items-center justify-content-between'>
                <h4>Danh sách phòng chiếu</h4>
                <Button type='primary' className='d-flex align-items-center justify-content-center'
                        onClick={() => goToAddRoomPage()}><PlusCircleOutlined />Thêm mới phòng chiếu</Button>
            </div>
            <div>
                <Table dataSource={listRoom}>
                    <Column title='ID room' dataIndex='roomId' key='roomId' />
                    <Column title='Tên phòng chiếu' dataIndex='roomName' key='roomName' />
                    <Column title='Chiều dài' dataIndex='totalRow' key='totalRow' />
                    <Column title='Chiều rộng' dataIndex='totalColumn' key='totalColumn' />
                    <Column
                        title='Trạng thái'
                        dataIndex='isEnable'
                        key='isEnable'
                        render={(isEnable: boolean) => (
                            <>
                                {isEnable && <Tag color='geekblue'>Open</Tag>}
                                {!isEnable && <Tag color='red'>Close</Tag>}
                            </>
                        )}
                    />
                    <Column
                        title='Action'
                        key='action'
                        render={(_: any, record: IRoomResponse) => (
                            <Space size='middle'>
                                <a onClick={() => goToRoomDetail(record.roomId)}>
                                    <EditOutlined />
                                </a>
                                <a>
                                    <DeleteOutlined />
                                </a>
                            </Space>
                        )}
                    />
                </Table>
            </div>
        </div>
    );
}

export default ListRoom;
