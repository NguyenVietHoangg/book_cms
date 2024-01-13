<template>
  <div class="card-body">
    <div class="tab-content" id="custom-tabs-tabContent">
      <BasicContentTab :store="store" :isShow="tab == '#basic' ? true : false" />
      <EntityContentTab :store="store" :isShow="tab == '#ref' ? true : false" />
      <SeoContentTab :store="store" :isShow="tab == '#seo' ? true : false" />
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

import BasicContentTab from "./BasicContentTab.vue";
import EntityContentTab from "./EntityContentTab.vue";
import SeoContentTab from "./SeoContentTab.vue";
export default defineComponent({
  props: {
    tab : {
      type: String
    },
    store: {
      type: Object
    }
  },
  data() {
    return {};
  },
  components: {
    BasicContentTab,
    SeoContentTab,
    EntityContentTab
  },
  setup(props) {
  },
  computed: {},
  methods: {},
  created() { },
});
</script>
