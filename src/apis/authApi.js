import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api/auth",
    headers: {
        "Content-Type": "application/json",
    },
});

export const login = async (credentials) => {
    const response = await apiClient.post("/login", credentials);
    return response.data;
};

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};
