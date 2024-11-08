import axios from "axios";

const host = "http://localhost:8080/api/v1/admin/qna";

// QnA 리스트 가져오기 (모든 질문 리스트)
export const getQNAList = async (page, size, type='', keyword='') => {
    const params= {
            page: page || 1,
            size: size || 10,
    };
    if(keyword){
        if(type){
            params.keyword = keyword;
            params.searchType = type;
        }
    }
    const res = await axios.get(`${host}/list`, { params });
    console.log(res)
    return res.data;
};

// 개별 QnA 질문 가져오기 (질문 + 답변 데이터)
export const getQNAOne = async (qno) => {
    const res = await axios.get(`${host}/${qno}`);
    return res.data;
};

// 답변 등록 (POST)
export const postQNAAnswer = async (answerData) => {
    const formData = new FormData();
    formData.append('answerText', answerData.answerText);

    // axios POST 요청 시 formData 전송
    const res = await axios.post(`${host}/${answerData.qno}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};

// 답변 수정 (PUT)
export const putQNAAnswer = async (answerData) => {
    const formData = new FormData();
    formData.append('answerText', answerData.answerText);

    // axios PUT 요청 시 formData 전송
    const res = await axios.put(`${host}/${answerData.qno}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};
