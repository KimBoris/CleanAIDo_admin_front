import axios from "axios";
import {useAuthStore} from "../stores/useAuthStore.js";


const host = "http://localhost:8080/api/v1/admin/user";

const BUSINESS_AUTH_API_SERVICE_KEY = import.meta.env.VITE_BUSINESS_AUTH_API_SERVICE_KEY;
const OCR_API_SECRET_KEY = import.meta.env.VITE_OCR_API_SECRET_KEY;
const OCR_API_PRIMARY_KEY = import.meta.env.VITE_OCR_API_PRIMARY_KEY;

export const getUserList = async (page, size, type = '', keyword = '') => {
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

    try {
        const res = await axios.get(`${host}/list`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params,
        });

        console.log(res);
        return res.data;
    } catch (error) {
        console.error("User 데이터를 못들고 왔어여", error);
        throw error;
    }
};

// 사용자 등록
export const postUserOneWithFile = async (formData) => {
    try {

        const res = await axios.post(`${host}/register`, formData)
        return res.data;

    } catch(error) {

        console.error("사용자 등록 api 호출 실패", error.response?.data || error.message);
        throw error;

    }
}

// ocr 텍스트 인식
export const postOcrImage = async (formData) => {
    try{

        const res = await axios
            .post(`https://ohcomdxe9l.apigw.ntruss.com/custom/v1/36396/99757e0871467a2eaee9486def3ce8f4203a99b9d73d28b3`
                + `6e9ab1b36883bdfd/infer`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-OCR-SECRET': OCR_API_SECRET_KEY,
                    'x-ncp-apigw-api-key': OCR_API_PRIMARY_KEY,
                }
            })

        return res.data;

    } catch (error) {

        console.error("ocr api 호출 실패", error.response?.data || error.message);
        throw error;

    }
}

// 사업자 진위여부
export const postBusinessAuth = async (businesses) => {
    try {

        const res = await axios
            .post(`https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${BUSINESS_AUTH_API_SERVICE_KEY}`,
                businesses, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        return res.data;

    } catch (error) {

        console.error("사업자진위여부 api 호출 실패", error.response?.data || error.message);
        throw error;

    }
}

// 아이디 중복 확인
export const postCheckUserId = async (userId) => {
    try {

        const res = await axios.post(`${host}/checkid`,
            userId, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        console.log(userId);
        return res.data;

    } catch (error) {

        console.error("ID 중복체크 실패", error.response?.data || error.message);
        throw error;

    }
}

// 입점요청 리스트
export const getUserRequestList = async (page, size) => {

    const authStore = useAuthStore();
    const accessToken = authStore.accessToken

    try {
        const params= {
            page: page || 1,
            size: size || 10,
        };

        const res = await axios.get(`${host}/request`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params,
        });

        return res.data;
    } catch (error) {

        console.error("입점요청 리스트 호출 실패", error.response?.data || error.message);
        throw error;

    }

}

export const getUserOne = async (userId) => {

    const authStore = useAuthStore();
    const accessToken = authStore.accessToken

    try {

        const res = await axios.get(`${host}/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        return res;

    } catch (error) {

        console.error("판매자 조회 호출 실패", error.response?.data || error.message);
        throw error;

    }
}

// 판매자 상태 변경
export const putUserStatus = async (request) => {

    const authStore = useAuthStore();
    const accessToken = authStore.accessToken

    try {

        const res = await axios.put(`${host}/status`,
            request, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            });

        return res.data;

    } catch (error) {

        console.error("입점요청 승인 호출 실패", error.response?.data || error.message);
        throw error;

    }

}