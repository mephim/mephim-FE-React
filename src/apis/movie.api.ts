import http from '../utils/http';
import Constant from '../shared/constants';
import { IMovieCreateDto } from '../shared/model/dto/IMovieCreateDto';


export const getAllMovieRequest = (): Promise<any> => {
    return http.get(Constant.API_URL.MOVIE_FIND_ALL);
};

export const getMovieHasTicketRequest = (): Promise<any> => {
    return http.get(Constant.API_URL.MOVIE_HAS_TICKET);
};

export const findMovieByIdRequest = (movieId: number): Promise<any> => {
    return http.get(Constant.API_URL.MOVIE_DETAIL + '/' + movieId);
};

export const addMovieRequest = (movie: IMovieCreateDto): Promise<any> => {
    return http.post(Constant.API_URL.CREATE_MOVIE, movie);
};
