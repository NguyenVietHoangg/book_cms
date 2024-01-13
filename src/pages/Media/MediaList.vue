<template>
  <div class="">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <!-- /.container-fluid -->
    </section>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- /.row -->
        <div class="row">
          <div class="col-12">
            <div class="card">
              <!-- /.card-header -->
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-11">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Tên tìm kiếm</label>
                      <input type="text" @input="handleInputKeySearch" @keyup.enter="mediaListStore.getListPager" v-model="mediaListStore.filters.keySearch" class="form-control" id="name" placeholder="Gõ từ khóa và enter">
                    </div>
                  </div>
                  <div class="form-group" title="Reset bộ lọc" @click="mediaListStore.getListPager(1, 'reset')">
                    <label>&nbsp;</label>
                    <span class="form-control"><i class="fas fa-sync"></i></span>
                  </div>
                </div>
              </div>
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap" v-if="tables.rows.length">
                  <thead>
                    <tr>
                      <th width="2px" v-if="multiple">
                        <input type="checkbox" @click="clickCheckboxId(true)" v-model="isCheckAll" />
                      </th>
                      <th width="5px" class="text-center">ID</th>
                      <th width="40px">Ảnh đại diện</th>
                      <th>Tên Media</th>
                      <th width="30px" v-if="!multiple">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in tables.rows" :key="index">
                      <th width="2px" v-if="multiple">
                        <input type="checkbox" v-model="idsChecked" :value="item.id" @click="clickCheckboxId(false)">
                      </th>
                      <td class="text-center">{{item.id}}</td>
                      <td class="text-center"><img class="cover-item" :src="item.link" alt=""/></td>
                      <td>
                        <div>-- {{ item.name }}</div>
                      </td>
                      <td v-if="!multiple">
                        <button class="btn btn-sm btn-primary"><i class="fas fa-checked"></i> Lựa chọn</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <LabelText v-else-if="mediaListStore.loading" :classAlert="'text-center alert-dismissible'" :classInput="'blink'" text="Đang tải Media ..." />
                <LabelText v-else text="Không tìm thấy Media nào" :classAlert="'text-center alert-dismissible'" />
              </div>
              <!-- /.card-body -->
              <div class="card-footer clearfix" v-if="tables.rows.length">
                <Paginate
                  :page-count="tables.totalPage"
                  :page-range="tables.perPage"
                  :margin-pages="2"
                  :click-handler="mediaListStore.getListPager"
                  :prev-text="'Prev'"
                  :next-text="'Next'"
                  :container-class="'pagination pagination-sm m-0 float-right'"
                  :page-class="'page-item'"
                >
                </Paginate>
              </div>
            </div>
            <!-- /.card -->
          </div>
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>
<script>
import { defineComponent } from "vue";
import Treeselect from 'vue3-treeselect'
import Paginate from "vuejs-paginate-next";
import { useMediaListStore, useMediaDetailStore } from '../../stores/modules/mediaStore'

export default defineComponent({
  props: {},
  data() {
    return {
      mediaListStore: new useMediaListStore(),
      mediaDetailStore: new useMediaDetailStore(),
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
      return this.mediaListStore.dataTable;
    },
    tab() {
      let value = this.$route.hash || ''
      this.mediaListStore.filters.tab = value
      return value
    }
  },
  methods: {
    handleInputKeySearch(e) {
      if (!e.target.value) {
        this.mediaListStore.getListPager()
      }
    },
    changeOptionsFiltersStatus(node) {
      this.mediaListStore.filters.status = node.id
      this.mediaListStore.getListPager()
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
      this.mediaListStore.changeStatus(this.idsChecked, status)
      this.idsChecked = []
    },
    changeStorage(tab) {
      window.location.href = `/app/media${tab}`
      this.mediaListStore.filters.tab = tab
      this.mediaListStore.getListPager(1, true)
    }
  },
  created() {
    this.mediaListStore.getListPager()
  },
});
</script>
