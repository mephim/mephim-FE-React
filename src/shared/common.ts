import { isNull } from 'util';

export const formatDateOnlyGetDate = (dateInput: any) => {
    const date = new Date(dateInput);
    return [
        date?.getDate(),
        date?.getMonth() + 1,
        date?.getFullYear(),
    ].join('-');
};

export const formatDateOnlyGetTime = (dateInput: any) => {
    const date = new Date(dateInput);
    return [date?.getHours(),
        date?.getMinutes(),
        date?.getSeconds()].join(':');
};

export const formatDate = (dateInput: any) => {
    const date = new Date(dateInput);
    return [date?.getFullYear(),
            date?.getMonth() + 1,
            date?.getDate(),
        ].join('/') + ' ' +
        [date?.getHours(),
            date?.getMinutes(),
            date?.getSeconds()].join(':');
};

export const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.');
};

export const parseJwt =  (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};
