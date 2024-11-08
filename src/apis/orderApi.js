import axios from 'axios';

const host = 'http://localhost:8080/api/v1/admin/orders';

export const getInProgressOrders = (page = 1, size = 10) => {
    return axios.get(`${host}/in-progress`, {
        params: { page, size }
    });
};

export const getCanceledOrders = (page = 1, size = 10, status = '') => {
    return axios.get(`${host}/canceled`, {
        params: { page, size, status }
    });
};

export const searchInProgressOrders = (page = 1, size = 10, searchType, keyword) => {
    return axios.get(`${host}/in-progress`, {
        params: { page, size, searchType, keyword }
    });
};

export const searchCanceledOrders = (page = 1, size = 10, searchType, keyword, status = '') => {
    return axios.get(`${host}/canceled`, {
        params: { page, size, searchType, keyword, status }
    });
};
