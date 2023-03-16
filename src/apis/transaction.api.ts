import http from '../utils/http';
import Constant from '../shared/constants';
import { ITransactionDto } from '../shared/model/dto/ITransactionDto';

export const findTransByMail = (trans: ITransactionDto): Promise<any> => {
    return http.post(Constant.API_URL.FIND_TRANS_BY_MAIL, trans);
};