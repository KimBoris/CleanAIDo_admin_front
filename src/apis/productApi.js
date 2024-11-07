import axios from "axios";

const host = "http://localhost:8080/api/v1/product";

// QnA 리스트 가져오기 (모든 질문 리스트)
export const getProductList = async (page, size, type='', keyword='') => {
    const params= {
        page: page || 1,
        size: size || 10,
    };
    if(keyword){
        if(type){
            params.keyword = keyword;
            params.type = type;
        }
    }
    const res = await axios.get(`${host}/list`, { params });
    console.log(res)
    return res.data;
};