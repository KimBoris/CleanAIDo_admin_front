import { createRouter, createWebHistory } from "vue-router";
import faqRouters from "./faq.js";
import qnaRouters from "./qna.js";
import orderRouters from "./order.js";
import productRouters from "./product.js";
import authRouters from "./auth.js";
import { useAuthStore } from "../stores/useAuthStore";

const MainPage = () => import("../pages/MainPage.vue");

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: MainPage },
        authRouters,
        faqRouters,
        qnaRouters,
        orderRouters,
        productRouters,
    ],
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const requiredRole = to.meta?.requiredRole;

    if (!authStore.isAuthenticated && requiredRole) {
        alert("로그인이 필요합니다.");
        return next("/auth/login");
    }

    if (requiredRole && authStore.role !== requiredRole) {
        alert("권한이 없습니다.");
        return next("/");
    }

    next();
});

export default router;
