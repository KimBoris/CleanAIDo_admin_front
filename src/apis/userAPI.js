import {useAuthStore} from "../stores/useAuthStore.js";


const host = "http://localhost:8080/api/v1/user";

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
            params.searchType = type;
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
    }
    catch (error)
    {
        console.error("User 데이터를 못들고 왔어여", error);
        throw error;
    }
};