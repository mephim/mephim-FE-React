import http from '../utils/http';
import Constant from '../shared/constants';

export const getTransactionByMonth = (numMonthAgo: number): Promise<any> => {
    return http.get(Constant.API_URL.GET_TRANSACTION_BY_MONTH + '?numMonth=' + numMonthAgo);
};

export const getTransactionByDayAgo = (numDayAgo: number): Promise<any> => {
    return http.get(Constant.API_URL.GET_TRANSACTION_BY_MONTH + '?numMonth=' + numDayAgo);
};

export const getMovieStatics = (numDayAgo: number): Promise<any> => {
    return http.get(Constant.API_URL.GET_MOVIE_STATICS + '?numDays=' + numDayAgo);
};

export const getCategoryStatics = (numDayAgo: number): Promise<any> => {
    return http.get(Constant.API_URL.GET_CHANGE_CATEGORY + '?numDays=' + numDayAgo);
};

export const getChangeTransactionOnYear = (): Promise<any> => {
    return http.get(Constant.API_URL.GET_CHANGE_TRANSACTION_ONE_YEAR);
};

export const getChangeTransactionOnWeek = (): Promise<any> => {
    return http.get(Constant.API_URL.GET_CHANGE_TRANSACTION_ONE_WEEK);
};
