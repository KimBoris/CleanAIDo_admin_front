import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("authStore", () => {
    const accessToken = ref(localStorage.getItem("accessToken") || "");
    const refreshToken = ref(localStorage.getItem("refreshToken") || "");
    const role = ref(localStorage.getItem("userRole") || "");
    const userId = ref(localStorage.getItem("userId") || "");
    const error = ref(null);

    const isAuthenticated = computed(() => !!accessToken.value);

    const setLogin = async (response) => {
        try {

            accessToken.value = response.data.accessToken;
            refreshToken.value = response.data.refreshToken;
            role.value = response.data.adminRole ? "ROLE_ADMIN" : "ROLE_SELLER";
            userId.value = response.data.userId;
            error.value = null;

            localStorage.setItem("accessToken", accessToken.value);
            localStorage.setItem("refreshToken", refreshToken.value);
            localStorage.setItem("userRole", role.value);
            localStorage.setItem("userId", userId.value);

        } catch (err) {
            error.value = err.message || "로그인 실패";
        }
    };

    const setLogout = () => {
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

    return { accessToken, refreshToken, role, userId, error, isAuthenticated, setLogin, setLogout };
});
