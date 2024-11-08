import { createRouter, createWebHistory } from 'vue-router';
import faqRouters from './faq.js';
import qnaRouters from './qna.js';
import orderRouters from './order.js';

const routes = [
    faqRouters,
    qnaRouters,
    orderRouters,
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
