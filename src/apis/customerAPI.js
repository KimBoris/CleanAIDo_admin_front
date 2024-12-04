import axios from "axios";

const host = "http://localhost:8080/api/v1/admin/customer";

export const getCustomerList = async (page, size, type = '', keyword = '') => {
    try {
        const getCustomerList = await axios.get
        (`${host}/list`, {
            params: {
                page,
                size,
                type,
                keyword
            }

        });
        return response.data;
    } catch (error) {
        return null;
    }
}