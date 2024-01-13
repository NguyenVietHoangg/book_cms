const routes = [
    {
      path: "/app/menu",
      name: "Menu List",
      component: () => import ('@/pages/Menu/MenuList.vue'),
      props: {
      }
    },
    // {
    //   path: "/app/category/:id",
    //   name: "Category Detail",
    //   component: () => import ('@/pages/Category/CategoryDetail.vue'),
    //   props: {
    //   }
    // },
  ];
  export default routes