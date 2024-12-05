import axios from "axios";
import {useAuthStore} from "../stores/useAuthStore.js";

const host = "http://localhost:8080/api/v1/product";

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
    return res.data;
};

export const getCategoryList = async (keyword='') => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken
    const params= {
        keyword: keyword
    }
    const res = await axios.get(`${host}/seller/category`, {
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
    const res = await axios.post(`${host}/seller/register`, formData,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
}


export const getProductById = async (pno) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken
    const res = await axios.get(`${host}/read/${pno}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    return res.data;
};

export const updateProduct = async (formData, pno)=>{
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken
    console.log("업데이트를 실행합니다")
    console.log(formData.imageFiles)
    const res = await axios.put(`${host}/seller/${pno}`, formData,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    return res.data
}
