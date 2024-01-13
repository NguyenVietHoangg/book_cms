const routes = [
  {
    path: "/app/category",
    name: "Category List",
    component: () => import ('@/pages/Category/CategoryList.vue'),
    props: {
    }
  },
  {
    path: "/app/category/:id",
    name: "Category Detail",
    component: () => import ('@/pages/Category/CategoryDetail.vue'),
    props: {
    }
  },
];
export default routes