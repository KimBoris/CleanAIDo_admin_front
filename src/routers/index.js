import faqRouters from "./faq.js";
import {createRouter, createWebHistory} from "vue-router";


const MainPage = () => import("../pages/MainPage.vue");

const routes = [
    {path: '/', component: MainPage},
    faqRouters
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;