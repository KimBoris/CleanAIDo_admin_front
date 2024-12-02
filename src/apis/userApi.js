import axios from "axios";

const host = "http://localhost:8080/api/v1/admin/user";

const BUSINESS_AUTH_API_SERVICE_KEY = import.meta.env.BUSINESS_AUTH_API_SERVICE_KEY;
const OCR_API_SECRET_KEY = import.meta.env.OCR_API_SECRET_KEY;


export const postUserOneWithFile = async (formData) => {
    const res = await axios.post(`${host}/register`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return res.data;
}

export const postBusinessAuth = async (formData) => {}