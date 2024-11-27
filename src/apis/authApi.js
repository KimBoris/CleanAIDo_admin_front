import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api/auth",
    headers: {
        "Content-Type": "application/json",
    },
});

export const login = async (credentials) => {
    try {
        const response = await apiClient.post("/login", credentials);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error("Invalid credentials");
        }
        throw new Error("Login failed. Please try again later.");
    }
};

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};
