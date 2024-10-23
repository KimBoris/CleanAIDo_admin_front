import axios from "axios";

const host = "http://10.10.10.191:8080/api/v1/admin/qna";

// QnA 리스트 가져오기 (모든 질문 리스트)
export const getQNAList = async (page, size) => {
    const res = await axios.get(`${host}/list`, {
        params: {
            page: page || 1,
            size: size || 10,
        },
    });
    return res.data;
};

// 개별 QnA 질문 가져오기 (질문 + 답변 데이터)
export const getQNAOne = async (qno) => {
    const res = await axios.get(`${host}/${qno}`);
    return res.data;
};

// 답변 등록 (POST)
export const postQNAAnswer = async (answerData) => {
    const res = await axios.post(`${host}/${answerData.qno}?answerText=${encodeURIComponent(answerData.answerText)}`);
    return res.data;
};
