import http from '../utils/http';
import Constant from '../shared/constants';
import { ITicketCreateDto } from '../shared/model/dto/ITicketCerateDto';

export const createTicketRequest = (ticket: ITicketCreateDto): Promise<any> => {
    return http.post(Constant.API_URL.CREATE_TICKET, ticket);
};
export const findTicketByMovieNameRequest = (movieName: string): Promise<any> => {
    return http.get(Constant.API_URL.FIND_TICKET + '?movieName=' + movieName);
};
export const deleteTicketRequest = (ticketId: number): Promise<any> => {
    return http.post(Constant.API_URL.DELETE_TICKET, { ticketId });
};
