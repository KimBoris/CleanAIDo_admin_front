import axios from 'axios';

const host = "http://localhost:8080/api/v1/admin/orders";

export const getOrderList = (page = 1, size = 10) => {
    return axios.get(`${host}/list`, {
        params: { page, size }
    });
};
