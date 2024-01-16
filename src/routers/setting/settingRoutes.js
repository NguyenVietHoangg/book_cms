const routes = [
  {
    path: "/app/setting-general",
    name: "Setting General",
    component: () => import ('@/pages/Setting/SettingGeneral.vue'),
    props: {
    }
  },
  {
    path: "/app/permission",
    name: "Setting Permission",
    component: () => import ('@/pages/Setting/Permission.vue'),
    props: {
    }
  }
  
];

export default routes