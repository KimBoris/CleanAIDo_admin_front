import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore.js";

// QnA API 기본 경로 설정
const host = "http://localhost:8080/api/v1/qna";

// QnA 리스트 가져오기 (모든 질문 리스트)
export const getQNAList = async (page, size, type = '', keyword = '') => {
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
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;
    const res = await axios.get(`${host}/read/${qno}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // Authorization 헤더 추가
        },
    });
    return res.data;
};

// 답변 등록 (POST) - 관리자 전용
export const postQNAAnswer = async (answerData) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;
    const formData = new FormData();
    formData.append('answerText', answerData.answerText);

    const res = await axios.post(`${host}/admin/answer/${answerData.qno}`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};

// 답변 수정 (PUT) - 관리자 전용
export const putQNAAnswer = async (answerData) => {
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;
    const formData = new FormData();
    formData.append('answerText', answerData.answerText);

    const res = await axios.put(`${host}/admin/update/${answerData.qno}`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};
