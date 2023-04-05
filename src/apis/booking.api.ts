import http from '../utils/http';
import Constant from '../shared/constants';

export const addBookingRequest = (user: string, seatIds: number[], ticketId: number, pointOfUse = 0): Promise<any> => {
    return http.post(Constant.API_URL.ADD_BOOKING, { user, seatIds, ticketId, pointOfUse });
};
