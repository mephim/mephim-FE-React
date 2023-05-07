import http from '../utils/http';
import Constant from '../shared/constants';

export const getAllUserRequest = (): Promise<any> => {
    return http.get(Constant.API_URL.FIND_ALL_USER);
};
export const addPointRequest = (point: number, email: string): Promise<any> => {
    return http.post(Constant.API_URL.USER_ADD_POINT, {point, email});
};
export const setVisibleRequest = (isEnable: boolean, email: string, reason: string): Promise<any> => {
    return http.post(Constant.API_URL.USER_SET_VISIBLE, {isEnable, email, reason});
};
