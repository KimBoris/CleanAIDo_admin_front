const IndexPage = () => import("../pages/order/IndexPage.vue");
const OrderListPage = () => import("../pages/order/OrderListPage.vue");

const orderRouters = {
    path: "/order",
    component: IndexPage,
    meta: { title: "주문 목록" },
    children: [
        { path: "", redirect: '/order/list' },
        { path: "list", component: OrderListPage, meta: { back: "none" } }
    ],
};

export default orderRouters;
