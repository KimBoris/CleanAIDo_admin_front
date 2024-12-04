import axios from "axios";

const host = "http://localhost:8080/api/v1/admin/customer";

export const getCustomerList = async (page, size, type = '', keyword = '') => {
    try {
        const response = await axios.get
        (`${host}/list`, {
            params: {
                page,
                size,
                type,
                keyword
            }

        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching user list', error)
        return null;
    }
}