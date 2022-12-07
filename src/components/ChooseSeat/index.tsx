import "./style.css";
import { useLocation, useNavigate } from 'react-router-dom';
import {IShowTimeResponse} from "../../model/response/IShowTimeResponse";
import React, {LegacyRef, ReactNode, useEffect, useRef, useState} from "react";
import {Col, Row} from "react-bootstrap";
import * as Api from "../../api";
import {ISeatBookingResponse} from "../../model/response/ISeatBookingResponse";

interface ChooseSeatState {
    state: {
        response: IShowTimeResponse;
    };
}

interface IRow {
    row?: ISeatBookingResponse[];
}

interface IRowList {
    rowList?: IRow[];
}

function ChooseSeat() {
    const [rowArrayList, setRowArrayList] = useState<ISeatBookingResponse[][]>();
    const ref = useRef<any>([]);
    const [listSeatSelected, setListSeatSelected] = useState<ISeatBookingResponse[]>([]);
    const location = useLocation();
    const { state } = location as ChooseSeatState;
    const showDate = state.response.showDate;
    const showTime = state.response.showTime;
    const ticketId = state.response.ticket?.ticketId;
    const movie = state.response.ticket?.movie;

    const fetchData = async () => {
        const response = await Api.get(`http://localhost:9090/api/seat/find?showDateId=${showDate?.showDateId}&showTimeId=${showTime?.showTimeId}&ticketId=${ticketId}`);
        const widthRoom = Math.floor(Math.sqrt(response.length));

        let rows: ISeatBookingResponse[][] = [];
        while (response.length > 0) {
            const seatResponse: ISeatBookingResponse[] = response.splice(0, widthRoom);
            rows?.push(seatResponse);
        }

        setRowArrayList(rows);
    };

    useEffect(() => {
        fetchData();
    },[]);

    const findIndexSeat = (seat: ISeatBookingResponse) => {
        for(let i=0; i<listSeatSelected.length; i++){
            if(listSeatSelected[i].roomSeatId == seat.roomSeatId) {
                return i;
            }
        }

        return -1;
    };

    const handleClickSeat = (seat: ISeatBookingResponse, seatRowIndex: number, rowIndex: number) => {
        const indexSeat = findIndexSeat(seat);

        if(indexSeat == -1) {
            setListSeatSelected((prevState): ISeatBookingResponse[] => [...prevState, seat]);
        } else {
            // setListSeatSelected((prevState): ISeatBookingResponse[] => [listSeatSelected.splice()]);
        }

        setListSeatSelected((prevState): ISeatBookingResponse[] => [...prevState, seat]);

        ref.current.forEach((element: any, index: number) => {
            if(index === rowIndex) {
                if(ref.current[rowIndex].childNodes[seatRowIndex].classList.contains("choosing")) {
                    ref.current[rowIndex].childNodes[seatRowIndex].classList.remove("choosing");
                } else {
                    ref.current[index].childNodes[seatRowIndex].classList.add("choosing");
                }
            }
        })

    };

    return <div className="seat-selection">
        <Row className="d-flex justify-content-center">
            <Col xs={10}>
                <h4 className="fw-bold">Chọn ghế</h4>
                <Row>
                    <Col xs={10}>
                        <div className="choose-seat">
                            <div className="screen">
                                <span>Màn hình</span>
                            </div>
                            <div className="list-seat mt-24">
                                {rowArrayList?.map((rowArray, rowIndex) => (
                                    <div className="seat-row"
                                         key={rowIndex}
                                         ref={(element) => {
                                             ref.current[rowIndex] = element;
                                         }}
                                    >
                                        {rowArray.map((seat, seatRowIndex) => (
                                            <div
                                                key={seatRowIndex}
                                                className={`seat-item${seat.isBooking ? " isBooking": ""} ${seat.seatType==="VIP" ? "vip" : ""}`}
                                                 onClick={() => handleClickSeat(seat, seatRowIndex, rowIndex)}>
                                                <span>{seat.seatName}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                    <Col xs={2}>
                        <div className="movie-image">
                            <img src="https://metiz.vn/media/poster_film/keyvisual_for_promotion-01_1_.jpg" alt=""/>
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
                                        <span>{seat.seatName}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span>Số vé: 2</span>
                            </div>
                            <div>
                                <span>Tổng tiền: 130.000 VND</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>;
}

export default ChooseSeat;
