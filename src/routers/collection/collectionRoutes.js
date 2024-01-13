const routes = [
  {
    path: "/app/collection",
    name: "Collection List",
    component: () => import ('@/pages/Collection/CollectionList.vue'),
    props: {
    }
  },
  {
    path: "/app/collection/:id",
    name: "Collection Detail",
    component: () => import ('@/pages/Collection/CollectionDetail.vue'),
    props: {
    }
  },
]

export default routes