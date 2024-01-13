import { createRouter, createWebHistory } from "vue-router";
import { requireAuth } from "@/middleware/auth";
const routes = [
  {
    path: "/",
    beforeEnter: requireAuth,
    name: "Home",
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/me",
    name: "User",
    beforeEnter: requireAuth,
    component: () => import("@/pages/Auth/Me.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("@/pages/Auth/Login.vue"),
  },
  {
    path: "/app/product",
    name: "Product List",
    component: () => import("@/pages/Product/ProductList.vue"),
  },
  {
    path: "/app/product/:id",
    name: "Product Detail",
    component: () => import("@/pages/Product/ProductDetail.vue"),
    props: {},
  },
  {
    path: "/app/category",
    name: "Category List",
    component: () => import("@/pages/Category/CategoryList.vue"),
    props: {},
  },
  {
    path: "/app/collection/:id",
    name: "Collection Detail",
    component: () => import("@/pages/Collection/CollectionDetail.vue"),
    props: {},
  },
  {
    path: "/app/collection",
    name: "Collection List",
    component: () => import("@/pages/Collection/CollectionList.vue"),
    props: {},
  },
  {
    path: "/app/category/:id",
    name: "Category Detail",
    component: () => import("@/pages/Category/CategoryDetail.vue"),
    props: {},
  },
  {
    path: "/app/media",
    name: "Media List",
    component: () => import("@/pages/Media/MediaList.vue"),
    props: {},
  },
  {
    path: "/app/setting-general",
    name: "Setting General",
    component: () => import("@/pages/Setting/SettingGeneral.vue"),
    props: {},
  },
  {
    path: "/app/menu",
    name: "Menu List",
    component: () => import ('@/pages/Menu/MenuList.vue'),
    props: {
    }
  },
  {
    path: "/:catchAll(.*)",
    name: "Exception",
    component: () => import("@/pages/Exception/Error.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
