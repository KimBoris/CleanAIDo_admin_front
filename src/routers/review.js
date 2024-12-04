const ReviewReadPage = () => import("../pages/review/ReviewReadPage.vue")
const ReviewListPage = () => import("../pages/review/ReviewListPage.vue")
const IndexPage = () => import("../pages/review/IndexPage.vue")

const reviewRouters = {
    path: "/review",
    component: IndexPage,
    meta: {title: "리뷰(Review)"},
    children: [
        {path: "", redirect: '/review/list'},
        {path: "list", component: ReviewListPage, meta: {back: "none"}},
        {path: "read/:rno", component: ReviewReadPage},
    ],
};

export default reviewRouters;