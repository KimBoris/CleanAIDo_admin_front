import axios from 'axios';
import {useAuthStore} from "../stores/useAuthStore.js";

const host = 'http://localhost:8080/api/v1/orders';

// 진행 중인 주문 조회
export const getInProgressOrders = (page = 1, size = 10, searchType = '', keyword = '') => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;
    const userId = authStore.userId; // 사용자 ID
    const role = authStore.role; // 사용자 역할 (ROLE_ADMIN or ROLE_SELLER)

    if (!accessToken) {
        throw new Error('로그인이 필요합니다.');
    }

    return axios.get(`${host}/in-progress`, {
        params: {page, size, searchType, keyword, userId, role},
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

// 취소/교환/환불된 주문 조회
export const getCanceledOrders = (page = 1, size = 10, status = '', searchType = '', keyword = '') => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;
    const userId = authStore.userId; // 사용자 ID
    const role = authStore.role; // 사용자 역할 (ROLE_ADMIN or ROLE_SELLER)

    if (!accessToken) {
        throw new Error('로그인이 필요합니다.');
    }

    return axios.get(`${host}/canceled`, {
        params: {page, size, status, searchType, keyword, userId, role},
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};
