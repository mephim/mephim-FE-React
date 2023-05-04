import http from '../utils/http';
import Constant from '../shared/constants';
import { IRate } from '../shared/model/IRate';

export const findRateByMovie = (movieId: number): Promise<any> => {
    return http.get(Constant.API_URL.RATE_FIND_BY_MOVIE + '?movieId=' + movieId);
};

export const addRateRequest = (rate: IRate): Promise<any> => {
    console.log('Rate: ', rate);
    return http.post(Constant.API_URL.RATE_ADD, { ...rate });
};

export const findAllRate = (): Promise<any> => {
    return http.get(Constant.API_URL.GET_ALL_RATE);
};

export const reactRate = (rateId: number, isLike: boolean): Promise<any> => {
    return http.post(Constant.API_URL.REACT_RATE, {rateId, isLike});
};

export const deleteRate = (rateId: number): Promise<any> => {
    return http.post(Constant.API_URL.DELETE_RATE, {rateId});
};
