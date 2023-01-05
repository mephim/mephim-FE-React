import http from '../utils/http';
import Constant from '../shared/constants';

export const createPayment = (amount: number, vnp_OrderInfo: string): Promise<any> => {
    return http.post(Constant.API_URL.CREATE_PAYMENT, {
        amount,
        vnp_OrderInfo,
    });
};
