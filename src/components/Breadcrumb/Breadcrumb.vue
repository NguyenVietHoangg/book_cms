<template>
  <div class="content-header row">
    <div class="content-header-left col-md-9 col-12 mb-2">
      <div class="row breadcrumbs-top">
        <div class="col-12">
          <h2 class="content-header-title float-start mb-0">{{breads.name}}</h2>
          <div class="breadcrumb-wrapper">
            <ol class="breadcrumb">
              <li class="breadcrumb-item" v-for="(item, index) in breads.list" :class="item.class" :key="index">
                <a :to="item.href">{{item.title}}</a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    breads: {
      type: Array,
      default: []
    },
    name: {
      type: String,
      default: 'Default Title'
    }
  },
  data() {
    return {};
  },
  components: {},
  setup(props) {},
  methods: {},
  created() {},
});
</script>