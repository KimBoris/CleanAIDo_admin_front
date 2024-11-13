import axios from 'axios';

const host = 'http://localhost:8080/api/v1/admin/orders';

export const getInProgressOrders = (page = 1, size = 10, searchType = '', keyword = '') => {
    return axios.get(`${host}/in-progress`, {
        params: { page, size, searchType, keyword }
    });
};

export const getCanceledOrders = (page = 1, size = 10, status = '', searchType = '', keyword = '') => {
    return axios.get(`${host}/canceled`, {
        params: { page, size, status, searchType, keyword }
    });
};