import http from '../utils/http';
import Constant from '../shared/constants';

export const findShowDateByMovie = (movieId: number): Promise<any> => {
    return http.get(Constant.API_URL.SHOW_DATE_FIND + '?movieId=' + movieId);
};

export const findShowTimeByMovieAndShowDate = (movieId: number, showDateId: number): Promise<any> => {
    return http.get(Constant.API_URL.SHOW_TIME_FIND + '?movieId=' + movieId + '&showDateId=' + showDateId);
};
