import axios from "axios";
import {useAuthStore} from "../stores/useAuthStore.js";

const host = "http://localhost:8080/api/v1/admin/faq";

export const getFAQList = async (page, size, keyword = '') => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken
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


export const getFAQOne = async (fno) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken
    const res = await axios.get(`${host}/${fno}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
        },
    });
    return res.data;
};

export const postFAQOneWithFiles = async (formData) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken
    const res = await axios.post(`${host}`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
};
export const deleteFAQOne = async (fno) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken
    const res = await axios.delete(`${host}/${fno}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
        },
    });
    return res.data;
};

export const putFAQOneWithFiles = async (fno, formData) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken
    const res = await axios.put(`${host}/${fno}`, formData,{
        headers: {
            Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
        },

    });
    return res.data;
};