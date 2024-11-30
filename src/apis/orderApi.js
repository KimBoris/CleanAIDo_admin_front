import axios from 'axios';
import {useAuthStore} from "../stores/useAuthStore.js";

const host = 'http://localhost:8080/api/v1/orders';

export const getInProgressOrders = (page = 1, size = 10, searchType = '', keyword = '') => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken
    if(!accessToken){

    }
    return axios.get(`${host}/in-progress`, {
        Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
        params: { page, size, searchType, keyword },
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export const getCanceledOrders = (page = 1, size = 10, status = '', searchType = '', keyword = '') => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken
    return axios.get(`${host}/canceled`, {
        Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
        params: { page, size, status, searchType, keyword },
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};