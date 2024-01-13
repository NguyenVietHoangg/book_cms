<template>
    <div class="card-body">
      <div class="tab-content" id="custom-tabs-tabContent">
        <BasicContentTab :store="store" :isShow="tab == '#basic' ? true : false" />
        <EntityContentTab :store="store" :isShow="tab == '#ref' ? true : false" />
      </div>
    </div>
  </template>
  <script>
  import { defineComponent } from "vue";
  
  import BasicContentTab from "./BasicContentTab.vue";
  import EntityContentTab from "./EntityContentTab.vue";
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
      EntityContentTab
    },
    setup(props) {
    },
    computed: {},
    methods: {},
    created() { },
  });
  </script>
  