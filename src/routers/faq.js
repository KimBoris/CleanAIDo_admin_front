const IndexPage = () => import("../pages/faq/IndexPage.vue");
const FAQListPage = () => import("../pages/faq/FAQListPage.vue");
const FAQRegisterPage = () => import("../pages/faq/FAQRegisterPage.vue");
const FAQReadPage = () => import("../pages/faq/FAQReadPage.vue");
const FAQEditPage = () => import("../pages/faq/FAQEditPage.vue");

const faqRouters = {
    path: "/faq",
    component: IndexPage,
    children: [
        {path: "", redirect: '/faq/list'},
        {path: "list", component: FAQListPage },
        {path: "register", component: FAQRegisterPage },
        {path: "read/:fno", component: FAQReadPage },
        {path: "edit/:fno", component: FAQEditPage }
    ],
};

export default faqRouters;