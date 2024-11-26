import axios from "axios";
import useAuthStore from "../stores/useAuthStore.js";

const authStore = useAuthStore();
const accessToken = authStore.accessToken
const host = "http://localhost:8080/api/v1/product";

// QnA 리스트 가져오기 (모든 질문 리스트)
export const getProductList = async (page, size, type='', keyword='') => {
    const params= {
        page: page || 1,
        size: size || 10,
    };
    if(keyword){
        if(type){
            params.keyword = keyword;
            params.type = type;
        }
    }
    const res = await axios.get(`${host}/list`, {
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
        params,
    });
    console.log(res)
    return res.data;
};

export const getCategoryList = async (keyword='') => {
    const params= {
        keyword: keyword
    }
    const res = await axios.get(`${host}/register`, { params });
    console.log(res)
    return res.data;
};

export const postProduct = async (formData) =>{
    const res = await axios.post(`${host}`, formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
}