import { createRouter, createWebHistory } from "vue-router";
import faqRouters from "./faq.js";
import qnaRouters from "./qna.js";
import orderRouters from "./order.js";
import productRouters from "./product.js";
import authRouters from "./auth.js";
import { useAuthStore } from "../stores/useAuthStore";
import userRouters from "./user.js";
import customerRouters from "./customer.js";
import categoryRouters from "./category.js";

const MainPage = () => import("../pages/MainPage.vue");

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: MainPage }, // 메인 레이아웃
        authRouters,
        faqRouters,
        qnaRouters,
        orderRouters,
        productRouters,
        userRouters,
        customerRouters,
        categoryRouters
    ],
});

// 인증 및 권한 체크
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const requiredRole = to.meta?.requiredRole;

    // 로그인 필요한 페이지 접근 시 리다이렉트
    if (!authStore.isAuthenticated && requiredRole) {
        alert("로그인이 필요합니다.");
        return next("/auth/login");
    }

    // 권한 체크
    if (requiredRole && authStore.role !== requiredRole) {
        alert("권한이 없습니다.");
        return next("/");
    }

    next();
});

export default router;