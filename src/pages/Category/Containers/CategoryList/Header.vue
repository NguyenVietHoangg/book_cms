<template>
  <div class="card-header">
    <h3 class="card-title">{{tab == '#trash' ? 'Thùng rác' : 'Danh sách hiện tại'}}</h3>
    <div class="card-tools">
      <div class="input-group input-group-sm">
        <button type="button" class="btn btn-block btn-primary btn-sm" @click="categoryDetailStore.saveCategory()"><i class="fas fa-plus"></i> Thêm mới</button>
      </div>
    </div>
    <div class="card-tools" v-if="!tab || tab == '#normal'">
      <div class="input-group input-group-sm">
        <button type="button" class="btn btn-block btn-danger btn-sm" @click="changeStorage('#trash')"><i class="fas fa-trash"></i> Thùng rác</button>
      </div>
    </div>
    <div class="card-tools" v-if="tab && tab=='#trash'">
      <div class="input-group input-group-sm">
        <button type="button" class="btn btn-block btn-success btn-sm" @click="changeStorage('#normal')"><i class="fas fa-list"></i> Danh sách hiện tại</button>
      </div>
    </div>
    <div class="card-tools" v-if="categoryListStore.idsChecked.length && tab !='#trash'">
      <div class="input-group input-group-sm">
        <button type="button" class="btn btn-block btn-sm bg-gray" @click="categoryListStore.changeStatus(7)"><i class="fas fa-eraser"></i> Xóa</button>
      </div>
    </div>
    <div class="card-tools" v-if="categoryListStore.idsChecked.length">
      <div class="input-group input-group-sm">
        <button type="button" class="btn btn-block btn-warning btn-sm" @click="categoryListStore.changeStatus(6)"><i class="fas " :class="tab == '#trash' ? 'fa-backward' : 'fa-eye-slash'"></i> {{ tab !=='#trash' ? 'Tắt' : 'Khôi phục' }}</button>
      </div>
    </div>
    <div class="card-tools" v-if="categoryListStore.idsChecked.length && tab !='#trash'">
      <div class="input-group input-group-sm">
        <button type="button" class="btn btn-block btn-success btn-sm" @click="categoryListStore.changeStatus(1)"><i class="fas fa-eye"></i> Bật</button>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue"
import { mapStores } from "pinia"
import { categoryListStore, categoryDetailStore } from './../../../../stores/modules/categoryStore'

export default defineComponent({
  props: {},
  data() {
    return {
    }
  },
  components: {
  },
  computed: {
    ...mapStores(categoryListStore, categoryDetailStore),
    tab() {
      let value = this.$route.hash || ''
      this.categoryListStore.filters.tab = value
      return value
    }
  },
  methods: {
    changeStorage(tab) {
      window.location.href = `/app/category${tab}`
      this.categoryListStore.filters.tab = tab
      this.categoryListStore.idsChecked = []
      this.categoryListStore.isCheckAll = false
      this.categoryListStore.getListPager(1, true)
    }
  },
  created() {
  },
})
</script>
