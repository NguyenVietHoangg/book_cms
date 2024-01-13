const routes = [
  {
    path: "/app/story",
    name: "Story List",
    component: () => import ('@/pages/Category/CategoryList.vue'),
    props: {
    }
  },
  {
    path: "/app/story/:id",
    name: "Story Detail",
    component: () => import ('@/pages/Category/CategoryDetail.vue'),
    props: {
    }
  },
];
export default routes