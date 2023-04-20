import http from '../utils/http';
import Constant from '../shared/constants';
import { IMovieCreateDto } from '../shared/model/dto/IMovieCreateDto';


export const getAllMovieForAdmin = (): Promise<any> => {
    return http.get(Constant.API_URL.MOVIE_FIND_ALL_ADMIN);
};

export const getAllMovieRequest = (): Promise<any> => {
    return http.get(Constant.API_URL.MOVIE_FIND_ALL);
};
export const getMovieByNameRequest = (keySearch: string): Promise<any> => {
    return http.get(Constant.API_URL.MOVIE_HAS_TICKET + "?search=" + keySearch);
};

export const getMovieHasTicketRequestByCategory = (categoryId: number): Promise<any> => {
    return http.get(Constant.API_URL.MOVIE_HAS_TICKET + '?categoryId=' + categoryId);
};

export const findMovieByIdRequest = (movieId: number): Promise<any> => {
    return http.get(Constant.API_URL.MOVIE_DETAIL + '/' + movieId);
};

export const addMovieRequest = (movie: IMovieCreateDto): Promise<any> => {
    return http.post(Constant.API_URL.CREATE_MOVIE, movie);
};
