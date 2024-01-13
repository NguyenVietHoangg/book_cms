<template>
  <h1>404 Not Found</h1>
</template>
<script>
import { defineComponent } from "vue";
import DashboardAuthInfo from "@/containers/Auth/DashboardAuthInfo.vue";
export default defineComponent({
  props: {},
  data() {
    return {
      msg: 'Không tồn tại trang này',
      isSuccess: false
    };
  },
  components: {
    DashboardAuthInfo,
  },
  setup(props) {},
  methods: {},
  created() {},
});
</script>
