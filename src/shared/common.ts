export const formatDateOnlyGetDate = (date: any) => {
    return [
        date?.getDate(),
        date?.getMonth() + 1,
        date?.getFullYear()
    ].join('-')
};

export const formatDateOnlyGetTime = (date: any) => {
    return [date?.getHours(),
        date?.getMinutes(),
        date?.getSeconds()].join(':');
};

export const formatDate = (date: any) => {
    return [date?.getFullYear(),
            date?.getMonth() + 1,
            date?.getDate(),
        ].join('/') + ' ' +
        [date?.getHours(),
            date?.getMinutes(),
            date?.getSeconds()].join(':');
};
