import axios from "axios";

const host = "http://10.10.10.191:13306/api/v1/admin/faq";

export const getFAQList = async (page, size = 10) => {
    const res = await axios.get(`${host}/list`, {
        params: {
            page: page,
            size: size
        },
    });

    return res.data;
};
export const getFAQOne = async (fno) => {
    const res = await axios.get(`${host}/${fno}`);

    return res.data;
};

export const postFAQOne = async (faqObj) => {
    const res = await axios.post(`${host}`, faqObj);

    return res.data;
};

export const deleteFAQOne = async (fno) => {
    const res = await axios.delete(`${host}/${fno}`);

    return res.data;
}

export const putFAQOne = async (faqObj) => {
    const res = await axios.put(`${host}/${faqObj.fno}`, faqObj);

    return res.data
}