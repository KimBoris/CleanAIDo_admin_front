const IndexPage = () => import("../pages/customer/IndexPage.vue");
const CustomerListPage = () => import("../pages/customer/CustomerListPage.vue");

const customerRouter = {
    path: "/customer",
    component: IndexPage,
    meta: {title: "고객(customer)"},
    children: [
        {path: "", redirect: '/customer/list'},
        {path: "list", component: CustomerListPage, meta: {back: "none"}}
    ],
};
export default customerRouter;