const IndexPage = () => import("../pages/order/IndexPage.vue");
const OrderListInProgress = () => import("../pages/order/OrderListInProgressPage.vue");
const OrderListCanceled = () => import("../pages/order/OrderListCanceledPage.vue");
const OrderDetailList = () => import("../pages/order/OrderDetailListPage.vue");

const orderRouters = {
    path: "/order",
    component: IndexPage,
    meta: { title: "주문 관리" },
    children: [
        { path: "", redirect: "/order/list/in-progress" },
        { path: "list/in-progress", component: OrderListInProgress, meta: { back: "none" } },
        { path: "list/canceled", component: OrderListCanceled, meta: { back: "none" } },
        { path: "detail/:orderNum", component: OrderDetailList },
        { path: ":customerId", component:OrderListInProgress, meta: { back: "none" } },
    ],
};

export default orderRouters;
