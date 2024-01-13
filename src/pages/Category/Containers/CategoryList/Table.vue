<template>
  <div class="card-body table-responsive p-0">
    <table class="table table-hover text-nowrap" v-if="tables.rows.length">
      <thead>
        <tr>
          <th width="2px">
            <input type="checkbox" @click="clickCheckboxId(true)" v-model="categoryListStore.isCheckAll" />
          </th>
          <th width="5px" class="text-center">ID</th>
          <th width="40px">Ảnh đại diện</th>
          <th>Tên danh mục</th>
          <th width="30px">Trạng thái</th>
          <th width="30px">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tables.rows" :key="index">
          <th width="2px">
            <input type="checkbox" v-model="categoryListStore.idsChecked" :value="item.id" @click="clickCheckboxId(false)">
          </th>
          <td class="text-center">{{item.id}}</td>
          <td class="text-center" @click="Gcf._previewFile(item.medium)"><img class="cover-item" :src="item.medium.link" alt=""/></td>
          <td>
            <div v-if="!item.parent">
              <div class="text text-purple">-- {{ item.name }}</div>
            </div>
            <div v-else>
              <div>-- {{ item.parent.name }}</div>
              <div class="text text-purple"> ---- {{item.name}}</div>
            </div>
          </td>
          <td>
            <span class="color-palette" :class="item.vStatus.class">{{ item.vStatus.name }}</span>
          </td>
          <td>
            <router-link :to="'/app/category/'+item.id" class="btn btn-sm btn-primary"><i class="fas fa-edit"></i> Sửa</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <LabelText v-else-if="categoryListStore.loading" :classAlert="'text-center alert-dismissible'" :classInput="'blink'" text="Đang tải danh mục ..." />
    <LabelText v-else text="Không tìm thấy danh mục nào" :classAlert="'text-center alert-dismissible'" />
  </div>
  <!-- /.card-body -->
  <div class="card-footer clearfix" v-if="tables.rows.length">
    <Paginate
      :page-count="tables.totalPage"
      :page-range="tables.perPage"
      :margin-pages="2"
      :click-handler="categoryListStore.getListPager"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination pagination-sm m-0 float-right'"
      :page-class="'page-item'"
    >
    </Paginate>
  </div>
</template>
<script>
import { defineComponent } from "vue"
import { mapStores } from "pinia"
import { categoryListStore } from './../../../../stores/modules/categoryStore'

export default defineComponent({
  props: {},
  data() {
    return {
    }
  },
  components: {
  },
  computed: {
    ...mapStores(categoryListStore),
    tables() {
      return this.categoryListStore.dataTable;
    },
    tab() {
      let value = this.$route.hash || ''
      return value
    }
  },
  methods: {
    changeOptionsFiltersStatus(node) {
      this.categoryListStore.filters.status = node.id
      this.categoryListStore.getListPager()
    },
    clickCheckboxId (clickAll=false) {
      var me = this;
      // xử lý phần check tất cả
      if (clickAll) {
        me.categoryListStore.isCheckAll = !me.categoryListStore.isCheckAll;
        if (me.categoryListStore.isCheckAll) {
          me.categoryListStore.idsChecked = me.tables.rows.map(item => item.id)
        } else {
          me.categoryListStore.idsChecked = [];
        }
      } else {
        me.categoryListStore.isCheckAll = false;
        me.$nextTick(function () {
          me.Gcf._l.isEqual(me.Gcf._l.sortBy(me.idsChecked));
        })
      }
    },
  },
  created() {
    this.categoryListStore.filters.tab = this.tab
    this.categoryListStore.getListPager()
  },
});
</script>
