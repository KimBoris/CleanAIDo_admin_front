import axios from "axios";
import {useAuthStore} from "../stores/useAuthStore.js";

const host = "http://localhost:8080/api/v1/admin/customer";

export const getCustomerList = async (page, size, type = '', keyword = '') => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;
    const params = {
        page: page || 1,
        size: size || 10,
    };

    if(keyword){
        if(type)
        {
            params.keyword = keyword;
            params.type = type;
        }
    }

    try {
        const res = await axios.get(`${host}/list`, {
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
            params,
        });
        return res.data;
    } catch (error) {
        console.error('Error fetching user list', error)
        throw error;
    }
}