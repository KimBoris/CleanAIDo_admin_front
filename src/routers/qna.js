
const IndexPage = () => import("../pages/qna/IndexPage.vue");
const QNAListPage = () => import("../pages/qna/QNAListPage.vue");
const QNAReadPage = () => import("../pages/qna/QNAReadPage.vue");

const qnaRouters = {
    path: "/qna",
    component: IndexPage,
    children: [
        { path: "", redirect: '/qna/list' },
        { path: "list", component: QNAListPage },
        { path: ":qno", component: QNAReadPage },
    ],
};

export default qnaRouters;