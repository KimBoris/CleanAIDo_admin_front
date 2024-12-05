const IndexPage = () => import("../pages/user/IndexPage.vue");
const UserRegister = () => import("../pages/user/UserRegisterPage.vue");
const UserList = () => import("../pages/user/UserListPage.vue");
const UserRequest = () => import("../pages/user/UserRequestListPage.vue");
const UserRequestRead = () => import("../pages/user/UserRequestReadPage.vue");
const UserRead = () => import("../pages/user/UserReadPage.vue");

const userRouters = {
    path: "/user",
    component: IndexPage,
    meta: { title: "판매자(Seller)" },
    children: [
        {path: "", redirect: '/user/list'},
        {path: "list", component: UserList, meta:{back: "none"} },
        {path: "register", component: UserRegister, meta: { back: "none" } },
        {path: "read/:userId", component: UserRead },
        {path: "request", component: UserRequest, meta: { back: "none" } },
        {path: "request/:userId", component: UserRequestRead, meta: { read: "none" } },
    ],
};


export default userRouters;