import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore.js";

const host = "http://localhost:8080/api/v1/product";

// 상품 리스트 가져오기 (ROLE_ADMIN, ROLE_SELLER 접근 가능)
export const getProductList = async (page, size, type = '', keyword = '') => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;
    const params = {
        page: page || 1,
        size: size || 10,
    };

    if (keyword) {
        if (type) {
            params.keyword = keyword;
            params.type = type;
        }
    }

    const res = await axios.get(`${host}/list`, {
        params,
        headers: {
            Authorization: `Bearer ${accessToken}`, // accessToken 추가
        },
    });
    return res.data;
};

// 카테고리 리스트 가져오기 (ROLE_SELLER 접근 가능)
export const getCategoryList = async (keyword = '') => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;
    const params = {
        keyword: keyword,
    };

    const res = await axios.get(`${host}/seller/category`, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // accessToken 추가
        },
        params,
    });
    return res.data;
};

// 상품 등록 (ROLE_SELLER 접근 가능)
export const postProduct = async (formData) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;
    const res = await axios.post(`${host}/seller/register`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

// 특정 상품 조회 (ROLE_ADMIN, ROLE_SELLER 접근 가능)
export const getProductById = async (pno) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;

    const res = await axios.get(`${host}/read/${pno}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // accessToken 추가
        },
    });
    return res.data;
};

// 상품 수정 (ROLE_SELLER 접근 가능)
export const updateProduct = async (pno, formData) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;

    const res = await axios.put(`${host}/seller/${pno}`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};
