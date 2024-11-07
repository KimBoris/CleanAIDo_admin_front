import axios from "axios";

const host = "http://localhost:8080/api/v1/admin/faq";

export const getFAQList = async (page, size, keyword = '') => {
    const params = {
        page: page || 1,
        size: size || 10,
    };

    if (keyword) {
        params.keyword = keyword;
    }

    const res = await axios.get(`${host}/list`, { params });
    return res.data;
};


export const getFAQOne = async (fno) => {
    const res = await axios.get(`${host}/${fno}`);

    return res.data;
};

export const postFAQOneWithFiles = async (formData) => {
    const res = await axios.post(`${host}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
};
export const deleteFAQOne = async (fno) => {
    const res = await axios.delete(`${host}/${fno}`);

    return res.data;
};

export const putFAQOneWithFiles = async (fno, formData) => {
    const res = await axios.put(`${host}/${fno}`, formData);
    return res.data;
};