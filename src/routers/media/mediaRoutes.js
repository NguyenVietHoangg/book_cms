const routes = [
  {
    path: "/app/media",
    name: "Media List",
    component: () => import ('@/pages/Media/MediaList.vue'),
    props: {
    }
  }
];
export default routes