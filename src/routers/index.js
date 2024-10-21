import {createRouter, createWebHistory} from "vue-router";
import faqRouters from "./faq.js";


const MainPage = () => import("../pages/MainPage.vue");


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: MainPage },
        faqRouters,
    ],
});

export default router;