
const IndexPage = () => import("../pages/qna/IndexPage.vue");
const QNAListPage = () => import("../pages/qna/QNAListPage.vue");
const QNAReadPage = () => import("../pages/qna/QNAReadPage.vue");

const qnaRouters = {
    path: "/qna",
    component: IndexPage,
    children: [
        { path: "", redirect: '/qna/list' }, // 기본 페이지로 리디렉션
        { path: "list", component: QNAListPage }, // QNA 리스트 페이지
        { path: "read/:qno", component: QNAReadPage }, // QNA 읽기 페이지 (모달에서 읽기 및 수정)
    ],
};

export default qnaRouters;