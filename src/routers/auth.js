const LoginPage = () => import("../pages/auth/LoginPage.vue");

const authRouters = {
    path: "/auth",
    component: () => import("../layout/AuthLayout.vue"), // AuthLayout 적용
    children: [
        { path: "login", component: LoginPage, meta: { title: "로그인" } },
    ],
};

export default authRouters;