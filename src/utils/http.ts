import axios from 'axios';
import Constant from '../shared/constants';

const axiosApiInstance = axios.create({
    baseURL: Constant.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const requestRefreshToken = () => {
    return axiosApiInstance.post(Constant.API_URL.REFRESH_TOKEN, {
        refreshToken: window.localStorage.getItem('refresh_token'),
    });
};

axiosApiInstance.interceptors.request.use(
    async (config) => {
        if (config.headers) {
            config.headers['Authorization'] = 'Bearer ' + window.localStorage.getItem('access_token');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosApiInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await requestRefreshToken();
                    const { accessToken, refreshToken } = rs.data;
                    window.localStorage.setItem('access_token', accessToken);
                    window.localStorage.setItem('refresh_token', refreshToken);

                    originalConfig.headers = { ...originalConfig.headers, Authorization: 'Bearer ' + accessToken };

                    return axiosApiInstance(originalConfig);
                } catch (_error: any) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                    }

                    return Promise.reject(_error);
                }
            }

            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }

        return Promise.reject(err);
    },
);

export default axiosApiInstance;

// class Http {
//   instance: AxiosInstance;
//   axiosApiInstance = axios.create({
//     baseURL: Constant.BASE_URL,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//
//   constructor() {
//     this.instance = axios.create({
//       baseURL: Constant.BASE_URL,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//
//     const requestRefreshToken = () => {
//       return this.axiosApiInstance.post(Constant.API_URL.REFRESH_TOKEN, {
//         refreshToken: window.localStorage.getItem("refresh_token")
//       });
//     }
//
//     this.axiosApiInstance.interceptors.request.use(
//       async (config) => {
//         if (config.headers) {
//           config.headers["Authorization"] = 'Bearer ' + window.localStorage.getItem("access_token");
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );
//
//     this.axiosApiInstance.interceptors.response.use(
//       (res) => {
//         return res;
//       },
//       async (err) => {
//         const originalConfig = err.config;
//
//         if (err.response) {
//           // Access Token was expired
//           if (err.response.status === 401 && !originalConfig._retry) {
//             originalConfig._retry = true;
//
//             try {
//               const rs = await requestRefreshToken();
//               const { accessToken, refreshToken } = rs.data;
//               window.localStorage.setItem("access_token", accessToken);
//               window.localStorage.setItem("refresh_token", refreshToken);
//
//               originalConfig.headers = { ...originalConfig.headers, 'Authorization': 'Bearer ' + accessToken} ;
//
//               return this.axiosApiInstance(originalConfig);
//             } catch (_error: any) {
//               if (_error.response && _error.response.data) {
//                 return Promise.reject(_error.response.data);
//               }
//
//               return Promise.reject(_error);
//             }
//           }
//
//           if (err.response.status === 403 && err.response.data) {
//             return Promise.reject(err.response.data);
//           }
//         }
//
//         return Promise.reject(err);
//       }
//     );
//   }
// }
//
// const http = new Http().axiosApiInstance;
// export default http;
