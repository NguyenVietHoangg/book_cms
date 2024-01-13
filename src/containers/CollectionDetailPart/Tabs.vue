<template>
  <div class="card-header p-0 border-bottom-0">
    <ul class="nav nav-tabs" id="custom-tabs-tab" role="tablist">
      <li class="nav-item">
        <a class="nav-link" :class="currentTab == '#basic' ? 'active' : ''" id="custom-tabs-basic-tab" href="#basic" role="tab" aria-controls="custom-tabs-basic" aria-selected="false" @click="changeTab('#basic')">Thông tin chung</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="currentTab == '#ref' ? 'active' : ''" id="custom-tabs-ref-tab" href="#ref" role="tab" aria-controls="custom-tabs-ref" aria-selected="false" @click="changeTab('#ref')">Products</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    tab: {
      type: String,
      default: '#basic'
    }
  },
  data() {
    return {
      currentTab: this.tab || '#basic'
    };
  },
  components: {},
  setup(props) {
  },
  computed: {},
  methods: {
    changeTab(tab = '#basic') {
      this.currentTab = tab
    }
  },
  created() {
  },
});
</script>
