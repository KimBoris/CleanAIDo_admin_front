const IndexPage = () => import("../pages/order/IndexPage.vue");
const OrderListInProgress = () => import("../pages/order/OrderListInProgressPage.vue");
const OrderListCanceled = () => import("../pages/order/OrderListCanceledPage.vue");

const orderRouters = {
    path: "/order",
    component: IndexPage,
    meta: { title: "주문 관리" },
    children: [
        { path: "", redirect: "/order/list/in-progress" },
        { path: "list/in-progress", component: OrderListInProgress, meta: { title: "주문 내역" } },
        { path: "list/canceled", component: OrderListCanceled, meta: { title: "취소/교환/환불 내역" } },
    ],
};

export default orderRouters;
