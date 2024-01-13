<template>
  <div class="card-body">
    <div class="row">
      <div class="col-sm-9">
        <div class="form-group">
          <label for="exampleInputEmail1">Tên tìm kiếm</label>
          <input type="text" @input="handleInputKeySearch" @keyup.enter="onEnter()" v-model="categoryListStore.filters.keySearch" class="form-control" id="name" placeholder="Gõ từ khóa và enter">
        </div>
      </div>
      <div class="col-sm-2" :class="tab == '#trash' ? 'd-none' : ''">
        <div class="form-group">
          <label>Trạng thái</label>
          <Treeselect
            @select="changeOptionsFiltersStatus"
            :clearable="false"
            v-model="categoryListStore.filters.status"
            :options="Gcf._globalStatus" />
        </div>
      </div>
      <div class="form-group" title="Reset bộ lọc" @click="categoryListStore.getListPager(1, 'reset')">
        <label>&nbsp;</label>
        <span class="form-control"><i class="fas fa-sync"></i></span>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { categoryListStore, categoryDetailStore } from './../../../../stores/modules/categoryStore'

export default defineComponent({
  props: {},
  data() {
    return {
      categoryListStore: new categoryListStore(),
      categoryDetailStore: new categoryDetailStore(),
      idsChecked: [],
      isCheckAll: false,
      statusList: [
        {
          id: '',
          label: 'Tất cả'
        },
        {
          id: 1,
          label: 'Đang bật'
        },
        {
          id: 2,
          label: 'Đã tắt'
        },
      ],
      loading: true
    };
  },
  components: {
  },
  setup(props) { },
  computed: {
    tables() {
      return this.categoryListStore.dataTable;
    },
    tab() {
      let value = this.$route.hash || ''
      this.categoryListStore.filters.tab = value
      return value
    }
  },
  methods: {
    handleInputKeySearch(e) {
      if (!e.target.value) {
        this.categoryListStore.getListPager()
      }
    },
    onEnter() {
      this.categoryListStore.getListPager()
      // chuyển router
      this.$router.push({
        path: '/app/category',
        query: this.filters,
        hash: this.tab
      })
    },
    changeOptionsFiltersStatus(node) {
      this.categoryListStore.filters.status = node.id
      this.categoryListStore.getListPager()
    },
    clickCheckboxId (clickAll=false) {
      var me = this;
      // xử lý phần check tất cả
      if (clickAll) {
        me.isCheckAll = !me.isCheckAll;
        if (me.isCheckAll) {
          me.idsChecked = me.tables.rows.map(item => item.id)
        } else {
          me.idsChecked = [];
        }
      } else {
        me.isCheckAll = false;
        me.$nextTick(function () {
          me.Gcf._l.isEqual(me.Gcf._l.sortBy(me.idsChecked));
        })
      }
    },
    changeStatus(status) {
      this.categoryListStore.changeStatus(this.idsChecked, status)
      this.idsChecked = []
    },
    changeStorage(tab) {
      window.location.href = `/app/category${tab}`
      this.categoryListStore.filters.tab = tab
      this.categoryListStore.getListPager(1, true)
    }
  },
  created() {
    this.categoryListStore.filters.tab = this.tab
    this.categoryListStore.getListPager()
  },
});
</script>
