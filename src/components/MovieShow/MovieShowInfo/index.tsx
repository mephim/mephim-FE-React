import {formatDate, formatDateOnlyGetDate, formatDateOnlyGetTime} from "../../../shared/common";
import { Tag } from 'antd';
import { CheckCircleOutlined  } from '@ant-design/icons';

function MovieShowInfo({movieShowSelected}: any) {
    console.log("receiver: ", movieShowSelected)
    return <div>
        <h5>Thông tin phim</h5>
        <p>Phim: {movieShowSelected?.movieName}</p>
        <p>Thời lượng: <Tag color="magenta">{movieShowSelected?.movieLength}</Tag>Phút</p>
        <p>Phòng: <Tag color="magenta">{movieShowSelected?.roomName}</Tag></p>
        <p>Ngày chiếu: <Tag color="red" className="date-hl">{formatDateOnlyGetDate(movieShowSelected?.timeStart)}</Tag></p>
        <p>Giờ chiếu:
            <Tag color="geekblue">{formatDateOnlyGetTime(movieShowSelected?.timeStart)}</Tag>
            <span>-</span>
            <Tag color="geekblue">{formatDateOnlyGetTime(movieShowSelected?.timeEnd)}</Tag>
        </p>
        <Tag icon={<CheckCircleOutlined />} color="success">
            Submit
        </Tag>
    </div>
}

export default MovieShowInfo;
