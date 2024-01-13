<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Sản phẩm</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/">Dashboard</router-link>
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
                    <button type="button" class="btn btn-block btn-primary btn-sm" @click="productDetailStore.saveProduct"><i class="fas fa-plus"></i> Thêm mới</button>
                  </div>
                </div>
                <div class="card-tools" v-if="!tab || tab == '#normal'">
                  <div class="input-group input-group-sm">
                    <button type="button" class="btn btn-block btn-danger btn-sm" @click="changeStorage('#trash')"><i class="fas fa-trash"></i> Sản phẩm đã xóa</button>
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
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Tên tìm kiếm</label>
                      <input type="text" @input="handleInputKeySearch" @change="productListStore.getListPager" @keyup.enter="productListStore.getListPager" v-model="productListStore.filters.keySearch" class="form-control" id="name" placeholder="Gõ từ khóa và enter">
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label>Danh mục</label>
                      <Treeselect
                        @select="changeOptionsFiltersCategory"
                        v-model="categoryId"
                        :clearable="false"
                        :options="commonRefsStore.commonRefs.category" />
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label>Bộ sưu tập</label>
                      <Treeselect 
                        @select="changeOptionsFiltersCollection"
                        :clearable="false"
                        v-model="productListStore.filters.collectionId"
                        :options="commonRefsStore.commonRefs.collection" />
                    </div>
                  </div>
                  <div class="col-sm-2" :class="tab == '#trash' ? 'd-none' : ''">
                    <div class="form-group">
                      <label>Trạng thái</label>
                      <Treeselect
                        @select="changeOptionsFiltersStatus"
                        :clearable="false"
                        v-model="productListStore.filters.status"
                        :options="statusList" />
                    </div>
                  </div>
                  <div class="form-group" title="Reset bộ lọc" @click="productListStore.getListPager(1, 'reset')">
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
                      <th>Tên sản phẩm</th>
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
                      <td>{{item.name}}</td>
                      <td>
                        <span class="color-palette" :class="item.vStatus.class">{{ item.vStatus.name }}</span>
                      </td>
                      <td>
                        <router-link :to="'/app/product/'+item.id" class="btn btn-sm btn-primary"><i class="fas fa-edit"></i> Sửa</router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <LabelText v-else-if="productListStore.loading" :classAlert="'text-center alert-dismissible'" :classInput="'blink'" text="Đang tải sản phẩm ..." />
                <LabelText v-else text="Không tìm thấy sản phẩm nào" :classAlert="'text-center alert-dismissible'" />
              </div>
              <div class="card-footer clearfix" v-if="tables.rows.length">
                <Paginate
                  :page-count="tables.totalPage"
                  :page-range="tables.perPage"
                  :margin-pages="2"
                  :click-handler="productListStore.getListPager"
                  :prev-text="'Prev'"
                  :next-text="'Next'"
                  :container-class="'pagination pagination-sm m-0 float-right'"
                  :page-class="'page-item'"
                >
                </Paginate>
              </div>
              <!-- /.card-body -->
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
import { useProductListStore, useProductDetailStore } from '../../stores/modules/productStore'
import { commonRefsStore } from '../../stores/modules/commonStore'

export default defineComponent({
  props: {},
  data() {
    return {
      commonRefsStore: new commonRefsStore(),
      productListStore: new useProductListStore(),
      productDetailStore: new useProductDetailStore(),
      idsChecked: [],
      isCheckAll: false,
      categoryId: '',
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
          id: 6,
          label: 'Đã tắt'
        },
      ],
    };
  },
  components: {
  },
  setup(props) { },
  computed: {
    tables() {
      return this.productListStore.dataTable;
    },
    tab() {
      let value = this.$route.hash || ''
      this.productListStore.filters.tab = value
      return value
    }
  },
  methods: {
    handleInputKeySearch(e) {
      if (!e.target.value) {
        this.productListStore.getListPager()
      }
    },
    changeOptionsFiltersCategory(node) {
      this.productListStore.filters.categoryId = node.id
      this.productListStore.getListPager()
    },
    changeOptionsFiltersCollection(node) {
      this.productListStore.filters.collectionId = node.id
      this.productListStore.getListPager()
    },
    changeOptionsFiltersStatus(node) {
      this.productListStore.filters.status = node.id
      this.productListStore.getListPager()
    },
    clickCheckboxId (clickAll=false) {
      var me = this
      // xử lý phần check tất cả
      if (clickAll) {
        me.isCheckAll = !me.isCheckAll
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
      this.productListStore.changeStatus(this.idsChecked, status)
      this.idsChecked = []
    },
    changeStorage(tab) {
      window.location.href = `/app/product${tab}`
      this.productListStore.filters.tab = tab
      this.productListStore.getListPager(1, true)
    }
  },
  created() {
    this.productListStore.filters.tab = this.tab
    this.productListStore.getListPager()
    this.commonRefsStore.getCommonRefs({all_select: true})
  },
});
</script>
