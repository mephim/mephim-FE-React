import { formatDateOnlyGetDate, formatDateOnlyGetTime, numberWithCommas } from '../../../shared/common';
import { Tag } from 'antd';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import { deleteTicketRequest } from '../../../apis/ticket.api';

function MovieShowInfo({ movieShowSelected, onDelete }: any) {
    console.log('receiver: ', movieShowSelected);
    const confirmDelete = (ticketId: number) => {
        deleteTicketRequest(ticketId)
            .then((res) => {
                console.log(res.data.data);
                if (res.data.data) {
                    toast.success('🦄 Đã gỡ lịch chiếu');
                    onDelete();
                } else {
                    toast.error('🦄 Không thể gỡ lịch chiếu này vì đã có người đặt vé');
                }
            })
            .catch((err) => console.log(err));
    };
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
                <Button type="primary" danger onClick={() => confirmDelete(movieShowSelected?.ticketId)}>
                    Gỡ lịch chiếu
                </Button>
            </div>
        </div>
    );
}

export default MovieShowInfo;
