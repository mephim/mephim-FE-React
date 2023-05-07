import { Space, Table, Tag, Button, Input, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ToolOutlined, PlusCircleOutlined, CloseCircleOutlined, StopOutlined, IssuesCloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import React, { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react';
import { ICategory } from '../../../shared/model/ICategory';
import { findAllCategoryRequest } from '../../../apis/category.api';
import { IRoomResponse } from '../../../shared/model/response/IRoomResponse';
import IUserResponse from '../../../shared/model/response/IUserResponse';
import { addPointRequest, getAllUserRequest, setVisibleRequest } from '../../../apis/user.api';
import { toast, ToastOptions } from 'react-toastify';
const { Search,TextArea } = Input;
function User() {
    const navigate = useNavigate();
    const [listRoom, setListRoom] = useState<IUserResponse[]>([]);
    const [toggleState, setToggleState] = useState<boolean>(false);
    const inputPointRef = useRef() as RefObject<any>;
    const inputReasonRef = useRef() as RefObject<any>;

    console.log('---list room: ', listRoom);
    useEffect(() => {
        getAllUserRequest()
            .then((res) => setListRoom(res.data.data))
            .catch((err) => console.log(err));
    }, [toggleState]);

    const goToRoomDetail = (roomId: number) => {};

    const showFormPlusPoint = (email: string) => {
        Modal.info({
            title: 'Tặng điểm cho user',
            content: (
                // @ts-ignore
                <div className='d-flex align-items-center justify-content-center flex-column'>
                    <Input placeholder="Nhập điểm" type='number' ref={inputPointRef}/>
                    <Button className='mt-12' onClick={() => addPoint()}>Gửi</Button>
                </div>
            ),
            onOk() {},
            okText: 'Thoát',
        });

        const addPoint = () => {
            console.log('REF: ', inputPointRef);
            addPointRequest(Number(inputPointRef.current.input.value), email)
                .then(res => {
                    console.log(res.data.data);
                    toast.success('🦄 Cộng điểm thành công');
                    setToggleState(!toggleState);
                })
                .then(err => console.log(err))
        }
    };

    const showFormDisable = (email: string, isEnable: boolean) => {
        Modal.info({
            title: isEnable ? 'Khoá tài khoản user' : 'Mở khoá tài khoản',
            content: (
                // @ts-ignore
                <div className='d-flex align-items-center justify-content-center flex-column'>
                    {isEnable && <TextArea required rows={4} placeholder="Nhập lý do" ref={inputReasonRef} />}
                    <Button className='mt-12' onClick={() => visibleAccount()}>Gửi</Button>
                </div>
            ),
            onOk() {},
            okText: 'Thoát',
        });

        const visibleAccount = () => {
            console.log('REF: ', inputReasonRef);
            const reason = inputReasonRef?.current?.resizableTextArea?.textArea?.value || '';
            setVisibleRequest(!isEnable, email, reason)
                .then(res => {
                    console.log(res.data.data);
                    {isEnable && toast.success('🦄 Khoá tài khoản thành công');}
                    {!isEnable && toast.success('🦄 Mở Khoá tài khoản thành công');}
                    setToggleState(!toggleState);
                })
                .then(err => console.log(err))
        }
    };

    const renderTitle = () => {
        return (
            <div className="d-flex align-items-center justify-content-between">
                <h5>Danh sách user</h5>
                <div>
                    <Search placeholder="Tìm theo username" allowClear onSearch={() => {}} style={{ width: 304 }} />
                </div>
            </div>
        );
    };

    const confirmDelete = (roomId: number) => {};

    const tableColumns: ColumnsType<any> = [
        {
            title: 'ID User',
            dataIndex: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: 'registerDate',
        },
        {
            title: 'Điểm tiêu dùng',
            dataIndex: 'availablePoint',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isEnable',
            align: 'center',
            render: (isEnable: boolean) => {
                return (
                    <>
                        {isEnable && <Tag color="green">Mở</Tag>}
                        {!isEnable && <Tag color="volcano">Bị khoá</Tag>}
                    </>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (record: IUserResponse) => (
                <Space size="small">
                    <Button
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: 50 }}
                        block
                        icon={<PlusCircleOutlined />}
                        onClick={() => showFormPlusPoint(record.email)}
                    />

                    <Button
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: 50 }}
                        block
                        icon={<StopOutlined />}
                        onClick={() => showFormDisable(record.email, record.isEnable)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <Table bordered={true} title={() => renderTitle()} columns={tableColumns} dataSource={listRoom} />
    );
}

export default User
