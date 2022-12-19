import {formatDate, formatDateOnlyGetDate, formatDateOnlyGetTime} from "../../../shared/common";
import Badge from 'react-bootstrap/Badge';

function MovieShowInfo({movieShowSelected}: any) {
    console.log("receiver: ", movieShowSelected)
    return <div>
        <h5>Thông tin phim</h5>
        <p>Phim: {movieShowSelected?.movieName}</p>
        <p>Thời lượng: <Badge bg="secondary">{movieShowSelected?.movieLength}</Badge>Phút</p>
        <p>Phòng: {movieShowSelected?.roomName}</p>
        <p>Ngày chiếu: <Badge bg="warning" text="dark" className="date-hl">{formatDateOnlyGetDate(movieShowSelected?.start)}</Badge></p>
        <p>Giờ chiếu:
            <Badge bg="success">{formatDateOnlyGetTime(movieShowSelected?.start)}</Badge>
            <span>-</span>
            <Badge bg="success">{formatDateOnlyGetTime(movieShowSelected?.end)}</Badge>
        </p>
    </div>
}

export default MovieShowInfo;
