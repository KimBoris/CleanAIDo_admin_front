
const faqRouters = {
    path: "/faq",
    component: () => import("../pages/faq/IndexPage.vue"),
    children: [
        {path: "", redirect: '/faq/list'},
        {path: "list", component: () => import("../pages/faq/FAQListPage.vue") },
        {path: "register", component: () => import("../pages/faq/FAQRegisterPage.vue") },
        {path: "read/:fno", component: () => import("../pages/faq/FAQReadPage.vue") },
        {path: "edit/:fno", component: () => import("../pages/faq/FAQEditPage.vue") }
    ]
}

export default faqRouters;