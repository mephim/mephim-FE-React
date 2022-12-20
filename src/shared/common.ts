export const formatDateOnlyGetDate = (dateInput: any) => {
    const date = new Date(dateInput);
    return [
        date?.getDate(),
        date?.getMonth() + 1,
        date?.getFullYear()
    ].join('-')
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
