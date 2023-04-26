import { useEffect, useState } from 'react';
import { IRoomResponse } from '../../../shared/model/response/IRoomResponse';
import { findAllRoom } from '../../../apis/room.api';
import { Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
const { Column, ColumnGroup } = Table;

function ListRoom() {
    const [listRoom, setListRoom] = useState<IRoomResponse[]>([]);
    console.log('---list room: ', listRoom);
    useEffect(() => {
        findAllRoom()
            .then((res) => setListRoom(res.data.data))
            .catch((err) => console.log(err));
    }, []);
    return (
        <div>
            <h4>Danh sách phòng chiếu</h4>
            <div>
                <Table dataSource={listRoom}>
                    <Column title="ID room" dataIndex="roomId" key="roomId" />
                    <Column title="Tên phòng chiếu" dataIndex="roomName" key="roomName" />
                    <Column title="Chiều dài" dataIndex="totalRow" key="totalRow" />
                    <Column title="Chiều rộng" dataIndex="totalColumn" key="totalColumn" />
                    <Column
                        title="Trạng thái"
                        dataIndex="isEnable"
                        key="isEnable"
                        render={(isEnable: boolean) => (
                            <>
                                {isEnable && <Tag color="geekblue">Open</Tag>}
                                {!isEnable && <Tag color="red">Close</Tag>}
                            </>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(_: any, record: IRoomResponse) => (
                            <Space size="middle">
                                <a>
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
