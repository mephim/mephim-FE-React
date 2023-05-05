import Card from 'react-bootstrap/Card';
import { Space, Table, Tag, Button } from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import './style.css';
import React, { useEffect, useRef, useState } from 'react';
import { log } from 'util';
import { addNewRoomRequest } from '../../../../apis/room.api';
import { IRoom } from '../../../../shared/model/IRoom';
import { IAddRoom } from '../../../../shared/model/IAddRoom';
import { toast } from 'react-toastify';

function AddRoom() {
    const [roomName, setRoomName] = useState<string>('');
    const [withRoom, setWidthRoom] = useState<number>(10);
    const [heightRoom, setHeightRoom] = useState<number>(10);
    const [rowVIP, setRowVIP] = useState<number[]>([9]);
    const seatColumn = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
    const seatRow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const [rowArrayList, setRowArrayList] = useState<any>();

    console.log('RowVip: ', rowVIP);

    const withRoomRef = useRef<HTMLInputElement>(null);
    const heightRoomRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const rowArrays = [];

        for (let i = 0; i < heightRoom; i++) {
            let seatsOnRow = [];
            for (let j = 0; j < withRoom; j++) {
                seatsOnRow.push({ row: seatRow[i], column: seatColumn[j] });
            }
            rowArrays.push(seatsOnRow);
        }

        setRowArrayList(rowArrays);
        console.log('Seat map: ', rowArrays);
    }, [withRoom, heightRoom]);

    const displaySeatMap = () => {
        console.log('Width: ', withRoomRef?.current?.value);
        setWidthRoom(Number(withRoomRef?.current?.value));
        setHeightRoom(Number(heightRoomRef?.current?.value));
        setRowVIP([]);
    };

    const toggleRowVip = (rowIndex: number) => {
        const indexDel = rowVIP.indexOf(rowIndex);
        console.log('Index delete: ', indexDel);
        if (indexDel >= 0) {
            const cloneArr = [...rowVIP];
            cloneArr.splice(indexDel, 1);
            setRowVIP(cloneArr);
        } else {
            setRowVIP([...rowVIP, rowIndex]);
            rowVIP.push(rowIndex);
        }
    };

    const addNewRoom = () => {
        const room: IAddRoom = {
            name: roomName,
            height: heightRoom,
            width: withRoom,
            rowVIP: rowVIP,
        };
        addNewRoomRequest(room)
            .then((res) => {
                toast.success('🦄 Thêm phòng chiếu thành công!');
            })
            .catch((error) => {
                console.log('ERROR: ', error);
                toast.error('🦄 Đã có lỗi xảy ra');
            });
    };

    return (
        <Card body>
            <h5>Thêm mới phòng chiếu</h5>
            <Card className="d-flex align-items-center justify-content-center">
                <Card.Body className="w-25">
                    <span>Nhập tên phòng: </span>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setRoomName(e.target.value)}
                        placeholder={'Tên phòng'}
                    />
                    <span>Nhập số hàng: </span>
                    <input type="number" className="form-control" ref={withRoomRef} defaultValue={10} />
                    <span>Nhập số cột: </span>
                    <input type="number" className="form-control" ref={heightRoomRef} defaultValue={10} />
                    <div className="d-flex align-items-center justify-content-center mt-12">
                        <Button
                            type="primary"
                            className="d-flex align-items-center justify-content-center"
                            onClick={() => {
                                displaySeatMap();
                            }}
                        >
                            <PlusCircleOutlined />
                            Hiển thị sơ đồ ghế
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            <div>
                <h5>Sơ đồ ghế</h5>
                <div className="seat-generate d-flex align-items-center justify-content-center flex-column">
                    <div className="screen">
                        <span>Màn hình</span>
                    </div>
                    <div className="list-seat mt-24">
                        {rowArrayList?.map((rowArray: any, rowIndex: number) => (
                            <div className="seat-row" key={rowIndex}>
                                {rowArray.map((seat: any, seatRowIndex: number) => (
                                    <div
                                        key={seatRowIndex}
                                        className={`seat-item ${rowVIP.includes(rowIndex) ? 'vip' : ''}`}
                                    >
                                        <span>{seat.row + seat.column}</span>
                                    </div>
                                ))}

                                <Button
                                    type="primary"
                                    danger
                                    ghost
                                    className="d-inline-flex align-items-center justify-content-center"
                                    onClick={() => {
                                        toggleRowVip(rowIndex);
                                    }}
                                >
                                    <PlusCircleOutlined />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center mt-12">
                    <Button
                        type="primary"
                        className="d-flex align-items-center justify-content-center"
                        onClick={() => {
                            addNewRoom();
                        }}
                    >
                        <PlusCircleOutlined />
                        Thêm mới
                    </Button>
                </div>
            </div>
        </Card>
    );
}

export default AddRoom;
