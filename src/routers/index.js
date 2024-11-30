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
        authRouters, // Auth 라우터 추가
        faqRouters,
        qnaRouters,
        orderRouters,
        productRouters,
    ],
});

// 인증 및 권한 체크
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


// import { createRouter, createWebHistory } from "vue-router";
// import faqRouters from "./faq.js";
// import qnaRouters from "./qna.js";
// import orderRouters from "./order.js";
// import productRouters from "./product.js";
// import authRouters from "./auth.js";
// import { useAuthStore } from "../stores/useAuthStore";
//
// const MainPage = () => import("../pages/MainPage.vue");
//
// const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//         { path: "/", component: MainPage },
//         authRouters,
//         faqRouters,
//         qnaRouters,
//         orderRouters,
//         productRouters,
//     ],
// });
//
// // 권한 기반 라우팅 검사
// router.beforeEach((to, from, next) => {
//     const authStore = useAuthStore();
//     const userRole = authStore.role;
//
//     // 1. 인증되지 않은 경우 로그인 페이지로 리디렉션
//     if (to.meta?.roles && !authStore.isAuthenticated) {
//         alert("로그인이 필요합니다.");
//         return next("/auth/login");
//     }
//
//     // 2. 역할 기반 접근 제어
//     if (to.meta?.roles && !to.meta.roles.includes(userRole)) {
//         alert("권한이 없습니다.");
//         return next("/"); // 권한이 없으면 홈으로 이동
//     }
//
//     next(); // 조건을 통과하면 다음 페이지로 이동
// });
//
// export default router;

