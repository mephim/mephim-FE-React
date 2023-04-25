import { formatDateOnlyGetDate, formatDateOnlyGetTime, numberWithCommas } from '../../../shared/common';
import { Tag } from 'antd';
import { Button } from 'antd';

function MovieShowInfo({ movieShowSelected }: any) {
    console.log('receiver: ', movieShowSelected);
    return (
        <div>
            <h5>Thông tin phim lịch chiếu</h5>
            <p>
                <Tag color="volcano">ID vé: {movieShowSelected.ticketId}</Tag>
            </p>
            <p>Phim: {movieShowSelected?.movieName}</p>
            <p>
                Thời lượng: <Tag color="magenta">{movieShowSelected?.movieLength}</Tag>Phút
            </p>
            <p>
                Phòng: <Tag color="magenta">{movieShowSelected?.roomName}</Tag>
            </p>
            <p>
                Ngày chiếu:{' '}
                <Tag color="red" className="date-hl">
                    {formatDateOnlyGetDate(movieShowSelected?.timeStart)}
                </Tag>
            </p>
            <p>
                Giờ chiếu:
                <Tag color="geekblue">{formatDateOnlyGetTime(movieShowSelected?.timeStart)}</Tag>
                <span>-</span>
                <Tag color="geekblue">{formatDateOnlyGetTime(movieShowSelected?.timeEnd)}</Tag>
            </p>
            <p>
                Giá vé: <Tag color="magenta">{numberWithCommas(Number(movieShowSelected.ticketPrice))} đ</Tag>
            </p>
            <div className="d-flex align-items-center justify-content-around">
                <Button type="primary" danger>
                    Gỡ lịch chiếu
                </Button>
            </div>
        </div>
    );
}

export default MovieShowInfo;
