import axios from "axios";

const host = "http://10.10.10.191:8080/api/v1/admin/qna";

export const getQNAList = async (page, size) => {
    const res = await axios.get(`${host}/list`, {
        params: {
            page: page || 1,
            size: size || 10,
        },
    });

    return res.data;
};

export const getQNAOne = async (qno) => {
    const res = await axios.get(`${host}/${qno}`);

    return res.data;
};

export const putQNAAnswer = async (ansObj) => {
    const res = await axios.put(`${host}/${ansObj.ano}`, ansObj);

    return res.data;
};