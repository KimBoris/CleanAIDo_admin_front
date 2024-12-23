import {useAuthStore} from "../stores/useAuthStore.js";
import axios from "axios";

const host = "http://localhost:8080/api/v1/review";

export const getReviewList = async (page, size, type = '', keyword = '') => {
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
            params,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log(res);
        return res.data;
    }
    catch (error)
    {
        console.error("Review 데이터를 못들고 왔어여", error);
        throw error;
    }
};

export const getReview = async (rno) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;
    const res = await axios.get(`${host}/read/${rno}`,{
        headers:{Authorization: `Bearer ${accessToken}`,
        },
    })
    return res.data;

};

