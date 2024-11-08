import { createRouter, createWebHistory } from "vue-router";
import faqRouters from "./faq.js";
import qnaRouters from "./qna.js";
import orderRouters from "./order.js";
import productRouters from "./product.js";

const MainPage = () => import("../pages/MainPage.vue");

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: MainPage },
        faqRouters,
        qnaRouters,
        orderRouters,
        productRouters,
    ],
});

export default router;
