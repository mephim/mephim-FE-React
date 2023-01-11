import http from '../utils/http';
import Constant from '../shared/constants';

export const findAllCategoryRequest = (): Promise<any> => {
    return http.get(Constant.API_URL.CATEGORY_FIND_ALL);
};
