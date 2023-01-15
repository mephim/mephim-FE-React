import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { ITicketWrapper } from '../../shared/model/response/IShowTimeResponse';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import * as Api from '../../api';
import { ISeatBookingResponse } from '../../shared/model/response/ISeatBookingResponse';
import { toast } from 'react-toastify';
import { findListSeatByDateTimeTicketRequest } from '../../apis/seat.api';
import { numberWithCommas } from '../../shared/common';

interface ChooseSeatState {
    state: {
        response: any;
    };
}

function ChooseSeat() {
    const [rowArrayList, setRowArrayList] = useState<ISeatBookingResponse[][]>();
    const ref = useRef<any>([]);
    const [listSeatSelected, setListSeatSelected] = useState<ISeatBookingResponse[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location as ChooseSeatState;
    console.log('state: ', state);
    const showDate = state.response.showTimeRes.showDate;
    const showTime = state.response.showTimeRes.showTime;
    const ticket: ITicketWrapper = state.response.showTimeRes.ticket || {};
    const ticketId = state.response.showTimeRes.ticket?.ticketId;
    const movie = state.response.movie;
    const roomName = useRef();

    useEffect(() => {
        findListSeatByDateTimeTicketRequest(Number(showDate?.showDateId), Number(showTime?.showTimeId), Number(ticketId)).then(
            (res) => {
                roomName.current = res.data.data.room.roomName;
                const widthRoom = res.data.data.room.totalColumn;
                const listSeatAndPrice = res.data.data.roomSeat.map((seat: any) => {
                    return {
                        ...seat,
                        price:
                            seat.seatType === 'VIP'
                                ? ticket?.ticketPrice
                                    ? ticket.ticketPrice + 20000
                                    : 0
                                : ticket.ticketPrice,
                    };
                });

                let rows: ISeatBookingResponse[][] = [];
                while (listSeatAndPrice.length > 0) {
                    const seatResponse: ISeatBookingResponse[] = listSeatAndPrice.splice(0, widthRoom);
                    rows?.push(seatResponse);
                }

                console.log(rows);

                setRowArrayList(rows);
            },
        );
    }, []);

    const findIndexSeat = (seat: ISeatBookingResponse) => {
        for (let i = 0; i < listSeatSelected.length; i++) {
            if (listSeatSelected[i].roomSeatId === seat.roomSeatId) {
                return i;
            }
        }

        return -1;
    };

    const handleClickSeat = (seat: ISeatBookingResponse, seatRowIndex: number, rowIndex: number) => {
        if (seat.isBooking) {
            toast.info('🦄 Ghế này đã được đặt!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }
        const indexSeat = findIndexSeat(seat);

        if (indexSeat === -1) {
            setListSeatSelected((prevState): ISeatBookingResponse[] => [...prevState, seat]);
        } else {
            const listSeatUpdate = listSeatSelected.filter((item) => {
                return item.roomSeatId !== seat.roomSeatId;
            });
            setListSeatSelected(listSeatUpdate);
        }

        ref.current.forEach((element: any, index: number) => {
            if (index === rowIndex) {
                if (ref.current[rowIndex].childNodes[seatRowIndex].classList.contains('choosing')) {
                    ref.current[rowIndex].childNodes[seatRowIndex].classList.remove('choosing');
                } else {
                    ref.current[index].childNodes[seatRowIndex].classList.add('choosing');
                }
            }
        });
    };

    const handleNextClick = () => {
        if (listSeatSelected.length > 0) {
            navigate('/payment', {
                state: {
                    response: {
                        price: listSeatSelected.reduce((a, b) => +a + +b.price, 0),
                        email: 'leconghau095@gmail.com',
                        phone: '099333333',
                        name: 'Lê Công Hậu',
                        movie: movie,
                        seat: listSeatSelected,
                        showDate: showDate,
                        showTime: showTime,
                    },
                },
            });
        } else {
            toast.info('🦄 Hãy chọn 1 ghế!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };

    return (
        <div className="seat-selection">
            <Row className="d-flex justify-content-center">
                <Col xs={10}>
                    <h4 className="fw-bold">Chọn ghế</h4>
                    <h5>Phòng: {roomName.current}</h5>
                    <Row>
                        <Col xs={10}>
                            <Row>
                                <div className="choose-seat">
                                    <div className="screen">
                                        <span>Màn hình</span>
                                    </div>
                                    <div className="list-seat mt-24">
                                        {rowArrayList?.map((rowArray, rowIndex) => (
                                            <div
                                                className="seat-row"
                                                key={rowIndex}
                                                ref={(element) => {
                                                    ref.current[rowIndex] = element;
                                                }}
                                            >
                                                {rowArray.map((seat, seatRowIndex) => (
                                                    <div
                                                        key={seatRowIndex}
                                                        className={`seat-item${seat.isBooking ? ' isBooking' : ''} ${
                                                            seat.seatType === 'VIP' ? 'vip' : ''
                                                        }`}
                                                        onClick={() => handleClickSeat(seat, seatRowIndex, rowIndex)}
                                                    >
                                                        <span>{seat.seatName}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <div className="center mt-32">
                                        <button className="nextBtn" onClick={() => handleNextClick()}>
                                            Tiếp tục
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={2}>
                            <div className="movie-image">
                                <img
                                    src="https://metiz.vn/media/poster_film/keyvisual_for_promotion-01_1_.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="movie-description">
                                <div>
                                    <span>Phim: {movie?.movieName}</span>
                                </div>
                                <div>
                                    <span>Ngày chiếu: {showDate?.date}</span>
                                </div>
                                <div>
                                    <span>Thời gian: {showTime?.time}</span>
                                </div>
                                <div>
                                    <span>Ghế: </span>
                                    <div className="list-seat-selected">
                                        {listSeatSelected.map((seat) => (
                                            <span key={seat.roomSeatId}>{seat.seatName}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <span>Số vé: {listSeatSelected.length}</span>
                                </div>
                                <div>
                                    <span>Tổng tiền: {numberWithCommas(listSeatSelected.reduce((a, b) => +a + +b.price, 0))} VND</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default ChooseSeat;
