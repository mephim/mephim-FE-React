import http from '../utils/http';
import Constant from '../shared/constants';

export const findALlRoomRequest = (): Promise<any> => {
    return http.get(Constant.API_URL.ROOM_FIND_ALL);
};
