import http from '../utils/http';
import Constant from '../shared/constants';

export const getAllUserRequest = (): Promise<any> => {
    return http.get(Constant.API_URL.FIND_ALL_USER);
};
export const userDetail = (username: string): Promise<any> => {
    return http.get(Constant.API_URL.USER_DETAIL + '?username=' + username);
};
export const addPointRequest = (point: number, email: string): Promise<any> => {
    return http.post(Constant.API_URL.USER_ADD_POINT, { point, email });
};
export const setVisibleRequest = (isEnable: boolean, email: string, reason: string): Promise<any> => {
    return http.post(Constant.API_URL.USER_SET_VISIBLE, { isEnable, email, reason });
};
export const updateInfoRequest = (name: string, phone: string, email: string): Promise<any> => {
    return http.post(Constant.API_URL.USER_UPDATE_INFO, { name, phone, email });
};
export const updatePasswordRequest = (newPassword: string, email: string): Promise<any> => {
    return http.post(Constant.API_URL.USER_UPDATE_PASSWORD, { newPassword, email });
};
