import axios from "axios";
import useAuthStore from "../stores/useAuthStore.js";
// Pinia store를 가져와서 사용
const authStore = useAuthStore();
const accessToken = authStore.accessToken
const host = "http://localhost:8080/api/v1/admin/qna";

// QnA 리스트 가져오기 (모든 질문 리스트)
export const getQNAList = async (page, size, type = '', keyword = '') => {

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
        // axios 요청
        const res = await axios.get("http://localhost:8080/api/v1/admin/qna/list", {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Authorization 헤더 추가
            },
            params, // Query string 파라미터 추가
        });

        console.log(res);
        return res.data;

    } catch (error) {
        console.error("Error fetching QnA list:", error);
        throw error; // 필요 시 호출하는 곳에서 에러 처리
    }
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
