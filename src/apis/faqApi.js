import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore.js";

const host = "http://localhost:8080/api/v1/faq";

// FAQ 리스트 조회 (ROLE_ADMIN, ROLE_SELLER 모두 접근 가능)
export const getFAQList = async (page, size, keyword = '') => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;
    const params = {
        page: page || 1,
        size: size || 10,
    };

    if (keyword) {
        params.keyword = keyword;
    }

    const res = await axios.get(`${host}/list`, {
        params,
        headers: {
            Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
        },
    });
    return res.data;
};

// FAQ 상세 조회 (ROLE_ADMIN, ROLE_SELLER 모두 접근 가능)
export const getFAQOne = async (fno) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;
    const res = await axios.get(`${host}/read/${fno}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
        },
    });
    return res.data;
};

// FAQ 등록 (ROLE_ADMIN만 접근 가능)
export const postFAQOneWithFiles = async (formData) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;
    const res = await axios.post(`${host}/admin/register`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

// FAQ 삭제 (ROLE_ADMIN만 접근 가능)
export const deleteFAQOne = async (fno) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;
    const res = await axios.delete(`${host}/admin/${fno}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
        },
    });
    return res.data;
};

// FAQ 수정 (ROLE_ADMIN만 접근 가능)
export const putFAQOneWithFiles = async (fno, formData) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;
    const res = await axios.put(`${host}/admin/${fno}`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};
