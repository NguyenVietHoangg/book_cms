<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper container-xxl p-0">
      <breadcrumb :breads="breads" name />
      <div class="content-body">
        <!-- content here -->
          <p>New content</p>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import Breadcrumb from "@/components/breadcrumb/breadcrumb.vue"
export default defineComponent({
  props: {},
  data() {
    return {};
  },
  components: {
    Breadcrumb,
  },
  setup(props) {},
  computed: {
    breads() {
      let obj = {
        name: 'Default Breadcrumb',
        list: [
          {
          href: '/',
          class: '',
          title: 'Trang chủ'
          }
        ],
      }
      return obj
    }
  },
  methods: {},
  created() {},
});
</script>
