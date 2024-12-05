const IndexPage = () => import("../pages/faq/IndexPage.vue")
const CategoryPage = () => import("../pages/category/CategoryPage.vue")


const userRouters = {
    path: "/category",
    component: IndexPage,
    meta: { title: "카테고리(category)" },
    children: [
        {path: "", component: CategoryPage,}
    ],
};


export default userRouters;