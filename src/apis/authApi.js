import axios from "axios";
import {useAuthStore} from "../stores/useAuthStore.js";

const authLogin = useAuthStore()

const host = "http://localhost:8080/api/auth"

// const apiClient = axios.create({
//     baseURL: "http://localhost:8080/api/auth",
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

export const login = async (credentials) => {
    try {
        console.log(credentials)
        console.log(`${host}/login`)
        const response = await axios.post(
            `${host}/login`,
            credentials,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("post success :"+response.data)
       await authLogin.setLogin(response)
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error("Invalid credentials");
        }
        throw new Error("Login failed. Please try again later.");
    }
};
