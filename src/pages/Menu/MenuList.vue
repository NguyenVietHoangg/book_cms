<!-- File: App.vue -->
<template>
  <div id="app">
    <MyMenuEditor />
    <!-- Các thành phần Vue.js khác của ứng dụng của bạn -->
  </div>
</template>

<script>
import MyMenuEditor from './MyMenu.vue';
import { defineComponent } from "vue";

export default defineComponent(
  {
    props: {
    item: {},
  },
  setup(props) { },
  components: {
    MyMenuEditor,
  },
}
);
</script>

