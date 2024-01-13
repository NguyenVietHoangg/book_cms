<template>
  <div
    class="modal"
    id="frameFileManager"
    role="dialog"
    height="100%"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">File Manager</h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="">
            <!-- Content Header (Page header) -->
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
                              <input
                                type="text"
                                @input="handleInputKeySearch"
                                @change="mediaListStore.getListPager()"
                                @keyup.enter="mediaListStore.getListPager()"
                                v-model="mediaListStore.filters.keySearch"
                                class="form-control"
                                id="name"
                                placeholder="Gõ từ khóa và enter"
                              />
                            </div>
                          </div>
                          <div
                            class="form-group"
                            title="Reset bộ lọc"
                            @click="mediaListStore.getListPager(1, 'reset')"
                          >
                            <span class="form-control">
                              <i class="fas fa-sync"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="card-body table-responsive p-0">
                        <table
                          class="table table-hover text-nowrap"
                          v-if="tables.rows.length"
                        >
                          <thead>
                            <tr>
                              <th width="2px" v-if="multiple">
                                <input
                                  type="checkbox"
                                  @click="clickCheckboxId(true)"
                                  v-model="isCheckAll"
                                />
                              </th>
                              <th width="5px" class="text-center">ID</th>
                              <th width="40px">File</th>
                              <th>Tên Media</th>
                              <th width="50px" v-if="!multiple">Type</th>
                              <th width="30px" v-if="!multiple">Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(item, index) in tables.rows"
                              :key="index"
                            >
                              <th width="2px" v-if="multiple">
                                <input
                                  type="checkbox"
                                  v-model="idsChecked"
                                  :value="item.id"
                                  @click="clickCheckboxId(false)"
                                />
                              </th>
                              <td class="text-center">{{ item.id }}</td>
                              <td class="text-center" @click="$emit('preview', item)">
                                <img
                                  class="cover-item"
                                  :src="item.link"
                                  alt=""
                                />
                              </td>
                              <td>
                                <div>{{ item.name }}</div>
                              </td>
                              <td class="text-center">
                                {{ item.type }}
                              </td>
                              <td v-if="!multiple">
                                <div
                                  class="btn btn-sm btn-primary"
                                  @click="$emit('applyFileFromManager', [item], modelId)"
                                >
                                  <i class="fas fa-checked"></i> Lựa chọn
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <LabelText
                          v-else-if="mediaListStore.loading"
                          :classAlert="'text-center alert-dismissible'"
                          :classInput="'blink'"
                          text="Đang tải Media ..."
                        />
                        <LabelText
                          v-else
                          text="Không tìm thấy Media nào"
                          :classAlert="'text-center alert-dismissible'"
                        />
                      </div>
                      <!-- /.card-body -->
                      <div
                        class="card-footer clearfix"
                        v-if="tables.rows.length"
                      >
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
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
</template>
<script>
import { defineComponent } from "vue";
import Paginate from "vuejs-paginate-next";
import {
  useMediaListStore,
  useMediaDetailStore,
} from "../../../stores/modules/mediaStore";

export default defineComponent({
  props: {
    showFileManager: {
      type: String,
      default: null,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    modelId: {
			type: String,
			default: 'file_id'
		},
  },
  data() {
    return {
      mediaListStore: new useMediaListStore(),
      mediaDetailStore: new useMediaDetailStore(),
      idsChecked: [],
      isCheckAll: false,
    };
  },
  emits: ["test"],
  components: {
    Paginate,
  },
  setup(props) {
    console.log(props);
  },
  computed: {
    tables() {
      return this.mediaListStore.dataTable;
    },
    tab() {
      let value = this.$route.hash || "";
      this.mediaListStore.filters.tab = value;
      return value;
    },
  },
  methods: {
    handleInputKeySearch(e) {
      this.mediaListStore.filters.keySearch = e.target.value
      if (!e.target.value) {
        this.mediaListStore.getListPager();
      }
    },
  },
  created() {
    this.mediaListStore.getListPager();
  },
});
</script>
