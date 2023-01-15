import React, { useEffect, useState } from 'react';
import { adminFindAllShowRequest } from '../../../../apis/show.api';
import { IShowResponse } from '../../../../shared/model/IShowResponse';
import { Space, Table, Tag } from 'antd';
import Constant from '../../../../shared/constants';
import { numberWithCommas } from '../../../../shared/common';

const { Column, ColumnGroup } = Table;

function List2() {
    const [listShow, setListShow] = useState<IShowResponse[]>([]);
    console.log('---list show: ', listShow);
    useEffect(() => {
        adminFindAllShowRequest().then((res) => setListShow(res.data.data)).catch(err => console.log(err));
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
    return <div>
        <h4>Lịch chiếu phim tại rạp</h4>
        <div>
            <Table dataSource={listShow}>
                {/*<ColumnGroup title="Name">*/}
                {/*    <Column title="First Name" dataIndex="firstName" key="firstName" />*/}
                {/*    <Column title="Last Name" dataIndex="lastName" key="lastName" />*/}
                {/*</ColumnGroup>*/}
                <Column title='ID vé' dataIndex='ticketId' key='ticketId' />
                <Column title='Tên phim' dataIndex='movieName' key='movieName' />
                <Column title='Phòng chiếu' dataIndex='roomName' key='roomName'
                        render={(roomName: string) => (
                            <>
                                <Tag color={getRoomColor(roomName)} key={roomName}>
                                    {roomName}
                                </Tag>
                            </>
                        )}
                />
                <Column title='Thời gian bắt đầu' dataIndex='timeStart' key='timeStart' />
                <Column title='Thời gian kết thúc' dataIndex='timeEnd' key='timeEnd' />
                <Column title='Giá vé' dataIndex='ticketPrice' key='ticketPrice'
                        render={(ticketPrice: string) => (
                            <>
                                <Tag color='#f50' key={ticketPrice}>
                                    {numberWithCommas(Number(ticketPrice))} đ
                                </Tag>
                            </>
                        )}
                />
                {/*<Column title="Address" dataIndex="address" key="address" />*/}
                {/*<Column*/}
                {/*    title="Tags"*/}
                {/*    dataIndex="tags"*/}
                {/*    key="tags"*/}
                {/*    render={(tags: string[]) => (*/}
                {/*        <>*/}
                {/*            {tags.map((tag) => (*/}
                {/*                <Tag color="blue" key={tag}>*/}
                {/*                    {tag}*/}
                {/*                </Tag>*/}
                {/*            ))}*/}
                {/*        </>*/}
                {/*    )}*/}
                {/*/>*/}
                <Column
                    title='Action'
                    key='action'
                    render={(_: any, record: IShowResponse) => (
                        <Space size='middle'>
                            <a>Invite {record.ticketId}</a>
                            <a>Delete</a>
                        </Space>
                    )}
                />
            </Table>
        </div>
    </div>;
}

export default List2;
