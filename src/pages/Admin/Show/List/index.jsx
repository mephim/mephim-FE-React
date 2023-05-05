import * as Api from '../../../../api';
import React, { useEffect, useState } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.css';
import Constant from '../../../../shared/constants';
import MovieShowInfo from '../../../../components/MovieShow/MovieShowInfo';
import MyModal from '../../../../components/CustomModal';
import AddNewTicket from '../../../../components/MovieShow/AddNew';
import { Button, Modal } from 'antd';

moment.locale('en-GB');
BigCalendar.momentLocalizer(moment);

const allViews = Object.keys(BigCalendar.Views).map((k) => BigCalendar?.Views[k]);

function List() {
    const [open, setOpen] = useState(false);
    const API_URL = 'http://localhost:9090/api/movie/admin/find-all-show';
    const [listShow, setListShow] = useState();
    const [movieShowSelected, setMovieShowSelected] = useState();
    const [toggleState, setToggleState] = useState(false);
    console.log(movieShowSelected);
    console.log(listShow);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {};

    const handleCancel = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        const response = await Api.get(API_URL);
        const listShow = response.data.map((show) => {
            const timeStart = new Date(show.timeStart);
            const timeEnd = new Date(show.timeEnd);

            return {
                ...show,
                title: show.movieName,
                start: timeStart,
                end: timeEnd,
            };
        });
        setListShow(listShow);
    };

    const handleSelectedEvent = (event) => {
        const start = new Date(event.timeStart);
        const end = new Date(event.timeEnd);
        setOpen(true);
        setMovieShowSelected({ ...event, start, end });
    };

    useEffect(() => {
        fetchData();
    }, [toggleState]);

    // get room color from constants
    const getRoomColor = (roomName) => {
        return Constant.SHOW.ROOM_COLOR[roomName];
    };

    const addColorEvent = (event) => {
        const roomName = event.roomName;
        const backgroundColor = getRoomColor(roomName);
        // const color = event.movieLength > 110 ? 'black' : 'white';
        return { style: { backgroundColor } };
    };

    const handleCreateSuccess = () => {
        console.log('SUCCESS');
        setToggleState(!toggleState);
    };

    const handleDelete = () => {
        console.log('DELETED');
        setOpen(false);
        setToggleState(!toggleState);
    };

    return (
        <div className="list-show">
            <h4 className="text-center">Lịch chiếu phim tại rạp</h4>
            <div className="d-flex align-items-center justify-content-around">
                <BigCalendar
                    events={listShow || []}
                    step={60}
                    views={allViews}
                    defaultView="week"
                    defaultDate={new Date()}
                    popup={true}
                    onSelectEvent={(events, date) => {
                        console.log('set state');
                        handleSelectedEvent(events);
                    }}
                    eventPropGetter={(event) => addColorEvent(event)}
                />
                <AddNewTicket onSuccess={handleCreateSuccess} />
            </div>

            <Modal
                centered={true}
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText="Đóng"
                okText="Đồng ý"
            >
                <MovieShowInfo onDelete={handleDelete} movieShowSelected={movieShowSelected} />
            </Modal>
        </div>
    );
}

export default List;
