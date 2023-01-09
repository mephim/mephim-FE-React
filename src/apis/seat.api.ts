import http from '../utils/http';
import Constant from '../shared/constants';

export const findListSeatByDateTimeTicketRequest = (
    showDateId: number,
    showTimeId: number,
    ticketId: number,
): Promise<any> => {
    return http.get(
        Constant.API_URL.FIND_LIST_SEAT_BY_DATE_TIME_TICKET +
            '?showDateId=' +
            showDateId +
            '&showTimeId=' +
            showTimeId +
            '&ticketId=' +
            ticketId,
    );
};
