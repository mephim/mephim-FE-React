import {IShowTime} from "../IShowTime";
import {IShowDate} from "../IShowDate";
import {IRoom} from "../IRoom";
import {IMovie} from "../IMovie";

interface ITicketWrapper {
    movie?: IMovie;
    ticketId?: number;
    ticketPrice?: string;
}

export interface IShowTimeResponse {
    room?: IRoom;
    showTime?: IShowTime;
    showDate?: IShowDate;
    ticket?: ITicketWrapper;
}
