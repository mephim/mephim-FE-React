import http from '../utils/http';
import Constant from '../shared/constants';

export const findAllRoom = (): Promise<any> => {
    return http.get(Constant.API_URL.ROOM_FIND_ALL);
};

export const findALlRoomSeatRequest = (): Promise<any> => {
    return http.get(Constant.API_URL.ROOM_FIND_ALL_BY_ROOM_SEAT);
};
