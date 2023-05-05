import { Space, Table, Input, Button } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { IRoomResponse } from '../../../shared/model/response/IRoomResponse';
import React, { useEffect, useState } from 'react';
import { deleteRate, findAllRate, reactRate } from '../../../apis/rate.api';
import IRateResponse from '../../../shared/model/response/IRateResponse';
import { LikeOutlined, LikeFilled, StopOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Column } = Table;

function Rate() {
    const [listRate, setListRate] = useState<IRateResponse[]>([]);
    console.log('List Rate: ', listRate);
    const [refresh, setRefresh] = useState<boolean>(false);
    useEffect(() => {
        findAllRate()
            .then((res) => setListRate(res.data.data))
            .catch((err) => console.log(err));
    }, [refresh]);

    const renderTitle = () => {
        return (
            <div className="d-flex align-items-center justify-content-between">
                <h5>Quản lý đánh giá</h5>
                {/* <Search placeholder="Tìm theo phim" allowClear onSearch={() => {}} style={{ width: 304 }} /> */}
            </div>
        );
    };

    const likeThisRate = (rateId: number, isLike: boolean) => {
        reactRate(rateId, !isLike)
            .then((res) => {
                setRefresh(!refresh);
            })
            .catch((err) => console.log(err));
    };

    const deleteThisRate = (rateId: number) => {
        deleteRate(rateId)
            .then((res) => {
                setRefresh(!refresh);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <Table bordered={true} title={() => renderTitle()} dataSource={listRate}>
                <Column title="ID rate" dataIndex="rateId" key="rateId" />
                <Column title="User" dataIndex="username" key="username" />
                <Column title="Tên phim" dataIndex="movieName" key="movieName" />
                <Column title="Số sao" dataIndex="numRate" key="numRate" />
                <Column title="Nội dung" dataIndex="content" key="content" />
                <Column
                    title="Like"
                    key="liked"
                    render={(_: any, record: IRateResponse) => (
                        <Space size="large">
                            <Button
                                className="d-flex align-items-center justify-content-center"
                                style={{ width: 50 }}
                                block
                                icon={record.liked ? <LikeFilled /> : <LikeOutlined />}
                                onClick={() => likeThisRate(record.rateId, record.liked)}
                            />
                            <Button
                                className="d-flex align-items-center justify-content-center"
                                style={{ width: 50 }}
                                block
                                icon={<StopOutlined />}
                                onClick={() => deleteThisRate(record.rateId)}
                            />
                        </Space>
                    )}
                />
            </Table>
        </div>
    );
}

export default Rate;
