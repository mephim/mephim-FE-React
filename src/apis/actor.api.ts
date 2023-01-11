import http from '../utils/http';
import Constant from '../shared/constants';

export const findAllActorRequest = (): Promise<any> => {
    return http.get(Constant.API_URL.ACTOR_FIND_ALL);
};
