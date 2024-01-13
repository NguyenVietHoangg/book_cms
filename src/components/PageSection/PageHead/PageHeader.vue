<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Danh mục</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li class="breadcrumb-item active">Danh sách</li>
            </ol>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- /.row -->
        <div class="row">
          <div class="col-12">
            <div class="card">
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
                <div class="card-tools" v-if="idsChecked.length && tab !='#trash'">
                  <div class="input-group input-group-sm">
                    <button type="button" class="btn btn-block btn-sm bg-gray" @click="changeStatus(7)"><i class="fas fa-eraser"></i> Xóa</button>
                  </div>
                </div>
                <div class="card-tools" v-if="idsChecked.length">
                  <div class="input-group input-group-sm">
                    <button type="button" class="btn btn-block btn-warning btn-sm" @click="changeStatus(6)"><i class="fas " :class="tab == '#trash' ? 'fa-backward' : 'fa-eye-slash'"></i> {{ tab !=='#trash' ? 'Tắt' : 'Khôi phục' }}</button>
                  </div>
                </div>
                <div class="card-tools" v-if="idsChecked.length && tab !='#trash'">
                  <div class="input-group input-group-sm">
                    <button type="button" class="btn btn-block btn-success btn-sm" @click="changeStatus(1)"><i class="fas fa-eye"></i> Bật</button>
                  </div>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-9">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Tên tìm kiếm</label>
                      <input type="text" @input="handleInputKeySearch" @keyup.enter="categoryListStore.getListPager" v-model="categoryListStore.filters.keySearch" class="form-control" id="name" placeholder="Gõ từ khóa và enter">
                    </div>
                  </div>
                  <div class="col-sm-2" :class="tab == '#trash' ? 'd-none' : ''">
                    <div class="form-group">
                      <label>Trạng thái</label>
                      <Treeselect
                        @select="changeOptionsFiltersStatus"
                        :clearable="false"
                        v-model="categoryListStore.filters.status"
                        :options="statusList" />
                    </div>
                  </div>
                  <div class="form-group" title="Reset bộ lọc" @click="categoryListStore.getListPager(1, 'reset')">
                    <label>&nbsp;</label>
                    <span class="form-control"><i class="fas fa-sync"></i></span>
                  </div>
                </div>
              </div>
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap" v-if="tables.rows.length">
                  <thead>
                    <tr>
                      <th width="2px">
                        <input type="checkbox" @click="clickCheckboxId(true)" v-model="isCheckAll" />
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
                        <input type="checkbox" v-model="idsChecked" :value="item.id" @click="clickCheckboxId(false)">
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
import { useCategoryListStore, useCategoryDetailStore } from '../../stores/modules/categoryStore'

import LabelText from "@/components/LabelText/LabelText.vue"
export default defineComponent({
  props: {},
  data() {
    return {
      categoryListStore: new useCategoryListStore(),
      categoryDetailStore: new useCategoryDetailStore(),
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
    LabelText,
    Paginate,
    Treeselect,
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
    this.categoryListStore.getListPager()
  },
});
</script>
