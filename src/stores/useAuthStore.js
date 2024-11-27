import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { login as apiLogin, setAuthToken } from "../apis/authApi";

export const useAuthStore = defineStore("authStore", () => {
    const accessToken = ref(localStorage.getItem("accessToken") || "");
    const refreshToken = ref(localStorage.getItem("refreshToken") || "");
    const role = ref(localStorage.getItem("userRole") || "");
    const userId = ref(localStorage.getItem("userId") || "");
    const error = ref(null);

    const isAuthenticated = computed(() => !!accessToken.value);

    const login = async (credentials) => {
        try {
            const response = await apiLogin(credentials);
            const { accessToken: token, refreshToken: refresh, adminRole } = response;

            accessToken.value = token;
            refreshToken.value = refresh;
            role.value = adminRole ? "ROLE_ADMIN" : "ROLE_SELLER";
            userId.value = credentials.userId;
            error.value = null;

            localStorage.setItem("accessToken", token);
            localStorage.setItem("refreshToken", refresh);
            localStorage.setItem("userRole", role.value);
            localStorage.setItem("userId", userId.value);

            setAuthToken(token);
        } catch (err) {
            error.value = err.message || "로그인 실패";
        }
    };

    const logout = () => {
        accessToken.value = "";
        refreshToken.value = "";
        role.value = "";
        userId.value = "";
        error.value = null;

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userId");

        setAuthToken(null);
    };

    return { accessToken, refreshToken, role, userId, error, isAuthenticated, login, logout };
});
