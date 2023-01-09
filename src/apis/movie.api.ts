import http from '../utils/http';
import Constant from '../shared/constants';

export const getAllMoviesRequest = (): Promise<any> => {
    return http.get(Constant.API_URL.MOVIE_FIND);
};
