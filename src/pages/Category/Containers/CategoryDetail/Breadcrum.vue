<template>
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1>
          {{
            !categoryDetailStore.item.updatedAt ? "Thêm mới" : "Chỉnh sửa"
          }}
          sản phẩm
        </h1>
      </div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item">
            <router-link to="/app/category">Danh sách</router-link>
          </li>
          <li class="breadcrumb-item active">Sửa sản phẩm</li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue"
import { mapStores } from "pinia"
import { categoryDetailStore } from "./../../../../stores/modules/categoryStore"

export default defineComponent({
  props: {},
  data() {
    return {
    };
  },
  components: {
  },
  computed: {
    ...mapStores(categoryDetailStore),
  },
  methods: {
  }
});
</script>
