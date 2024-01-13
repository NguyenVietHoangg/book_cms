<template>
  <h1>SplashWaiting</h1>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
  },
  data() {
    return {
    }
  },
  components: {
  },
  setup(props) {
    
  },
  computed: {
    getStateLoading() {
      const systemStore = new this.Gcf._useSystemStore()
      return systemStore.loading.splashWaiting
    }
  },
  methods: {
  },
  created() {
  }
});
</script>
