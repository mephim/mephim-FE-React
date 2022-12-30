import axios, {AxiosInstance} from 'axios';
import Constant from "../shared/constants";

class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: Constant.BASE_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

const http = new Http().instance;
export default http;
