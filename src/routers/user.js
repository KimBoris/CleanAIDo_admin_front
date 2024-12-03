import UserListPage from "../pages/user/UserListPage.vue";

const IndexPage = () => import("../pages/user/IndexPage.vue");

const userRoutes =
    {
        path: '/user',
        component: IndexPage,
        meta: {title: "유저(user)"},
        children: [
            {path: "", redirect: '/user/list'},
            {path: "list", component: UserListPage, meta: {back: "none"}},
        ],
    };

export default  userRoutes;