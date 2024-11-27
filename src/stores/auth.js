import { defineStore } from "pinia";
import { login, setAuthToken } from "../apis/authApi";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        userId: null,
        role: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        error: null,
    }),

    actions: {
        async login(credentials) {
            try {
                const response = await login(credentials);
                const { accessToken, refreshToken, adminRole } = response;

                // 상태 업데이트
                this.userId = credentials.userId;
                this.role = adminRole ? "ROLE_ADMIN" : "ROLE_SELLER";
                this.accessToken = accessToken;
                this.refreshToken = refreshToken;
                this.isAuthenticated = true;
                this.error = null;

                // 토큰 저장
                setAuthToken(accessToken);
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("role", this.role);

                console.log("로그인 성공:", { accessToken, refreshToken, role: this.role });
            } catch (err) {
                this.error = err.response?.data || "로그인 실패";
                this.isAuthenticated = false;
                console.error("로그인 오류:", this.error);
            }
        },

        logout() {
            // 상태 초기화
            this.userId = null;
            this.role = null;
            this.accessToken = null;
            this.refreshToken = null;
            this.isAuthenticated = false;

            // 로컬 스토리지 초기화
            setAuthToken(null);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("role");

            console.log("로그아웃 성공");
        },

        restoreSession() {
            // 로컬 스토리지에서 기존 세션 복원
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
            const role = localStorage.getItem("role");

            if (accessToken && role) {
                this.accessToken = accessToken;
                this.refreshToken = refreshToken;
                this.role = role;
                this.isAuthenticated = true;

                setAuthToken(accessToken);
                console.log("세션 복원 성공:", { accessToken, role });
            } else {
                this.logout();
            }
        },
    },
});
