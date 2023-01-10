import http from '../utils/http';
import Constant from '../shared/constants';
import { ITicketCreateDto } from '../shared/model/dto/ITicketCerateDto';

export const createTicketRequest = (ticket: ITicketCreateDto): Promise<any> => {
    return http.post(Constant.API_URL.CREATE_TICKET, ticket);
};
