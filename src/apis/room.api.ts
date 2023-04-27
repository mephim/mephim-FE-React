import http from '../utils/http';
import Constant from '../shared/constants';
import { IAddRoom } from '../shared/model/IAddRoom';

export const addNewRoomRequest = (room: IAddRoom): Promise<any> => {
    return http.post(Constant.API_URL.ROOM_ADD_NEW, room);
};

export const findAllRoom = (): Promise<any> => {
    return http.get(Constant.API_URL.ROOM_FIND_ALL);
};

export const findALlRoomSeatRequest = (): Promise<any> => {
    return http.get(Constant.API_URL.ROOM_FIND_ALL_BY_ROOM_SEAT);
};
