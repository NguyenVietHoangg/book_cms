<template>
  <div class="tab-pane fade" :class="isShow ? 'active show' : ''" id="custom-tabs-seo" role="tabpanel" aria-labelledby="custom-tabs-seo-tab">
    <form @submit.enter.prevent="">
      <div class="form-group">
        <label for="seoTitle">Seo tiều đề</label>
        <input type="text" class="form-control" id="seoTitle" v-model="dataUpdate.seoTitle" placeholder="Điền seo tiêu đề">
      </div>
      <div class="form-group">
        <label for="seoDesc">Seo Mô tả</label>
        <input type="text" class="form-control" id="seoDesc" v-model="dataUpdate.seoDesc" placeholder="Điền seo mô tả">
      </div>
      <div class="form-group">
        <label for="seoKeywords">Seo key tìm kiếm</label>
        <input type="text" class="form-control" id="seoKeywords" v-model="dataUpdate.seoKeywords" placeholder="Điền seo mô tả">
      </div>
      <button type="button" class="btn btn-primary" :class="!store.isValid ? '' : ''" @click="store.saveProduct(dataUpdate, Gcf)">{{store.item.updatedAt ? 'Cập nhật' : 'Thêm mới'}}</button>
    </form>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    store: {
      type: Object
    }
  },
  data() {
    return {
      dataUpdate: {
        id: this.store.item.id || null,
        seoTitle: this.store.item.seoTitle || null,
        seoDesc: this.store.item.seoDesc || null,
        seoKeywords: this.store.item.seoKeywords || null,
        tab: 'seo'
      },
    };
  },
  components: {},
  setup(props) {},
  computed: {},
  methods: {},
  created() {},
});
</script>
