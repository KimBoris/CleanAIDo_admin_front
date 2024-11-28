import axios from "axios";
import {useAuthStore} from "../stores/useAuthStore.js";

const host = "http://localhost:8080/api/v1/seller/product";

// QnA 리스트 가져오기 (모든 질문 리스트)
export const getProductList = async (page, size, type='', keyword='') => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken
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
        params,
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
    });
    console.log(res)
    return res.data;
};

export const getCategoryList = async (keyword='') => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken
    const params= {
        keyword: keyword
    }
    const res = await axios.get(`${host}/register`, {
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
        params
    });
    console.log(res)
    return res.data;
};

export const postProduct = async (formData) =>{
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken
    const res = await axios.post(`${host}`, formData,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
}

// QnA 리스트 가져오기 (모든 질문 리스트)
export const getProductById = async (pno) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken
    console.log(`${host}/read/${pno}`)
    const res = await axios.get(`${host}/read/${pno}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })


    return res.data;
};

export const updateProduct = async (formData)=>{
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken
    const res = await axios.put(`${host}`, formData,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
        }
    })
}