const LoginPage = () => import("../pages/auth/LoginPage.vue");
const authRouters = {
    path: "/auth",
    component: LoginPage,
    children: [
        { path: "login", component: LoginPage, meta: { title: "로그인" } },
    ],
};

export default authRouters;
