import http from '../utils/http';
import Constant from '../shared/constants';

export const findAllShowDateRequest = (): Promise<any> => {
    return http.get(Constant.API_URL.SHOW_DATE_FIND_ALL);
};

export const findAllShowTimeRequest = (): Promise<any> => {
    return http.get(Constant.API_URL.SHOW_TIME_FIND_ALL);
};

export const findShowDateByMovieRequest = (movieId: number): Promise<any> => {
    return http.get(Constant.API_URL.SHOW_DATE_FIND + '?movieId=' + movieId);
};

export const findShowTimeByMovieAndShowDateRequest = (movieId: number, showDateId: number): Promise<any> => {
    return http.get(Constant.API_URL.SHOW_TIME_FIND + '?movieId=' + movieId + '&showDateId=' + showDateId);
};

export const adminFindAllShowRequest = (): Promise<any> => {
    return http.get(Constant.API_URL.ADMIN_FIND_ALL_SHOW);
};
