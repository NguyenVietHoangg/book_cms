<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>{{!productDetailStore.item.updatedAt ? 'Thêm mới' : 'Chỉnh sửa'}} sản phẩm</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/app/product">Danh sách</router-link>
              </li>
              <li class="breadcrumb-item active">Sửa sản phẩm</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-sm-12" v-if="!productDetailStore.loading && productDetailStore.item && productDetailStore.item.id">
            <div class="card card-primary card-outline card-outline-tabs">
              <Tabs :tab="tab || '#basic'"/>
              <ZoneContent :store="productDetailStore" :tab="tab || '#basic'"/>
            </div>
          </div>
          <LabelText v-else-if="productDetailStore.loading" :classAlert="'text-center alert-dismissible'"  :classInput="'blink'" text="Đang tải sản phẩm ..." />
          <LabelText v-else text="Sản phẩm không tồn tại" />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useProductDetailStore } from './../../stores/modules/productStore'
import { commonRefsStore } from '../../stores/modules/commonStore'

import Tabs from "@/containers/ProductDetailPart/Tabs.vue"
import ZoneContent from "@/containers/ProductDetailPart/ZoneContent.vue"

export default defineComponent({
  props: {},
  data() {
    return {
      commonRefsStore: new commonRefsStore(),
      productDetailStore: new useProductDetailStore(),
      loading: true
    }
  },
  components: {
    Tabs,
    ZoneContent
},
  setup(props) { 
    
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    tab() {
      return this.$route.hash
    }
  },
  methods: {
    test() {
      this.Gcf._showAlert();
    }
  },
  beforeRouteLeave(to, from) {
    this.productDetailStore.item = {}
  },
  created() {
    this.productDetailStore.getProductDetailById(this.id, this.Gcf)
    this.commonRefsStore.getCommonRefs()
  },
});
</script>
