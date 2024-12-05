const IndexPage = () => import("../pages/user/IndexPage.vue");
const UserRegister = () => import("../pages/user/UserRegisterPage.vue");
const UserList = () => import("../pages/user/UserListPage.vue");
const UserRequest = () => import("../pages/user/UserRequestListPage.vue");
const UserRequestRead = () => import("../pages/user/UserRequestReadPage.vue");

const userRouters = {
    path: "/user",
    component: IndexPage,
    meta: { title: "판매자(Seller)" },
    children: [
        {path: "", redirect: '/user/list'},
        {path: "list", component: UserList, meta:{back: "none"} },
        {path: "register", component: UserRegister },
        {path: "request", component: UserRequest },
        {path: "request/:userId", component: UserRequestRead },
    ],
};


export default userRouters;