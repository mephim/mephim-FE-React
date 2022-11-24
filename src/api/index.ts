import axios from 'axios';
const cors = require('cors');

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};

export const request = axios.create({
    baseURL: 'http://localhost:9090/',
});

export const get = async (path: string, options = {}) => {
    const response = await request.get(path, config);
    return response.data;
};

export const post = async (path: string) => {
    const response = await request.post(path);
    return response.data;
};
