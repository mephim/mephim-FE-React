import http from '../utils/http';
import Constant from '../shared/constants';

export const signInRequest = (username: string, password: string): Promise<any> => {
    return http.post(Constant.API_URL.SIGN_IN, { username, password });
};

export const signUpRequest = (email: string, password: string,): Promise<any> => {
    return http.post(Constant.API_URL.SIGN_UP, { email, password });
};

export const verifyRequest = (verifyCode: string): Promise<any> => {
    return http.post(Constant.API_URL.VERIFY, { verifyCode });
};

export const requestCodeRequest = (email: string): Promise<any> => {
    return http.post(Constant.API_URL.REQUEST_CODE, { email });
};
