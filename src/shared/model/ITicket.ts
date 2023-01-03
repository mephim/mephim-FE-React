import { IMovie } from './IMovie';
import { IRoom } from './IRoom';
import { IShowDate } from './IShowDate';
import { IShowTime } from './IShowTime';

export interface ITicket {
    room?: IRoom;
    showDate?: IShowDate;
    showTime?: IShowTime;
    movie?: IMovie;
}
