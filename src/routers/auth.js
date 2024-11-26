const LoginPage = () => import("../pages/auth/LoginPage.vue");

const authRouters = {
    path: "/auth",
    meta: { title: "사용자 인증" },
    children: [
        { path: "login", component: LoginPage, meta: { title: "로그인" } },
    ],
};

export default authRouters;
